angular.module('treinamento')
    .controller('treinamentoController',
    function ($filter, $timeout, $scope, dialogService, $rootScope, $mdDialog, $stateParams, $state, treinamentoService, dateService, $location) {
            $scope.init = function () {
                $scope.hasParam();
                $scope.loadPerguntas();   
                $scope.candidatarBtn = treinamentoService.candidaturaHabilitada($scope.treinamento);
                $scope.desCandidatarBtn = treinamentoService.desCandidatarHabilitado(listaColaboradores[0], $scope.treinamento);
                $scope.selectedTab = 0;
                $scope.certificadoCanvas = "";
                $scope.colaborador = listaColaboradores[0];
                $scope.classTableRow = true;
                $scope.showCertificado = false;       
                $scope.botaoResposta = [];   
                $scope.perguntaLiberada = [];
                $scope.iniciarTeste = false;
                $scope.currentTimeOut = {}; 
                $scope.avaliacaoRespostas = [];        
            }
            $scope.hasParam = function () {
                if ($stateParams.treinamento == undefined || $stateParams.treinamento == null) {
                    // $state.go('home');
                } else {
                    $scope.treinamento = $stateParams.treinamento;
                }
                console.log($stateParams.treinamento);
            }
            // ####################################
            // FICHA TECNICA
            // ####################################
            $scope.candidatura = function (acao) {
                if (acao == 'cancelar') {
                    var confirmeJson = {
                        "title": "Informação!",
                        "content": "Deseja realmente cancelar a inscrição?",
                        "buttonOk": "Sim",
                        "buttonCancel": "Não"
                    };
                } else {
                    var confirmeJson = {
                        "title": "Informação!",
                        "content": "Candidate-se somente se tiver realmente certeza do seu comparecimento!",
                        "buttonOk": "Candidatar",
                        "buttonCancel": "Desistir"
                    };
                }
                dialogService.confirm(confirmeJson);
            }
            // ####################################
            // CERTIFICADOS
            // ####################################
            $scope.dataCabecalho = function (data) {
                return dateService.formatDateHeader(data);
            }

            $scope.conteudoProgClass = function () {
                $scope.classTableRow = !$scope.classTableRow;
                return $scope.classTableRow ? 'alter-row' : '';
            }

            $scope.generatePic = function () {
                $rootScope.showLoading = true;
                var certificadoDiv = document.querySelector("#certificado");
                kendo.drawing
                    .drawDOM(certificadoDiv,
                        {
                            forcePageBreak: ".page-break",
                            paperSize: "A4",
                            scale: 1,
                            height: 595,
                            landscape: true
                        })
                    .then(function (group) {
                        $rootScope.showLoading = false;
                        kendo.drawing.pdf.saveAs(group, "Certificado " + $scope.treinamento.nome + ".pdf");
                    });
            }
            // ####################################
            // AVALIAÇÃO
            // ####################################
            $scope.loadPerguntas = function(){
                var perguntas = treinamentoService.getPerguntasTreinamento($scope.treinamento);
                perguntas.then(function(perguntasResult){
                    $scope.avaliacao = perguntasResult;
                    $scope.avaliacao.resultado = {};                    
                    console.log('perguntasResult', perguntasResult);
                }).catch(function (perguntasError) {
                    console.log('perguntasError', perguntasError);                    
                });
            }
            $scope.enviarResposta = function(pergunta,resposta,id){
                console.log(pergunta, resposta, id);
                if (resposta && $scope.botaoResposta[id]=='blue-btn'){
                    $timeout.cancel($scope.currentTimeOut);                    
                    $scope.botaoResposta[id] = 'loading';
                    $timeout(function(){
                        pergunta.resultado = pergunta.correta == resposta[id]?1:0;
                        $scope.botaoResposta[id] = 'green-btn';                        
                        id++;
                        $scope.startCount(id);
                        $scope.perguntaLiberada[id] = true;  
                        $location.hash('pergunta'+id);               
                    },1000);
                }
            }

            $scope.startTest = function(){
                $scope.perguntaLiberada[0] = true;
                $timeout(function () {
                    $scope.startCount(0);
                }, 700)
            }

            $scope.startCount = function(id){    
                var qtdPerguntas = $scope.avaliacao.perguntas.length;
                if (id < qtdPerguntas) {                      
                    if ($scope.avaliacao.perguntas[id].tempo>0){
                        $scope.currentTimeOut = 
                        $timeout(function(){
                            $scope.avaliacao.perguntas[id].tempo--;
                            $scope.startCount(id);
                        },1000);
                    }else{                    
                        $scope.currentTimeOut = 
                        $timeout(function () {
                            $scope.enviarResposta(
                                $scope.avaliacao.perguntas[id], 
                                $scope.avaliacaoRespostas,
                                id
                            );
                        }, 500);
                    }
                }else{
                    var resultado = treinamentoService.calculaResultado($scope.avaliacao);
                    $scope.avaliacao.resultado.aproveitamento = resultado;
                    if (resultado >= $scope.avaliacao.minimo){
                        $scope.avaliacao.resultado.aprovado = true;
                    }else{
                        $scope.avaliacao.resultado.aprovado = false;
                    }                    
                    console.log('avaliacao',$scope.avaliacao);
                }   
            }

            $scope.openCertificado = function(){
                $scope.showCertificado = true;
                $timeout(function(){
                    $scope.selectedTab = 2;
                });
            }
        });