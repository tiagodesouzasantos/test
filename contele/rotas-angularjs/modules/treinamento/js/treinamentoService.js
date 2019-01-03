angular.module('treinamento')
    .service('treinamentoService', 
        function($q, $http, db, session,time) {
            return {
                someFunction: function() {
                    

                },
                candidaturaHabilitada:function(treinamento){
                    var habilitada = false;
                    var validacoes = ["treinamentoValidaData","lotacaoTreinamento"];
                    for (var i = 0; i < validacoes.length;i++){                        
                        switch (validacoes[i]){
                            case 'treinamentoValidaData':
                                habilitada = this.treinamentoValidaData(treinamento);
                            break;
                            case 'lotacaoTreinamento':
                                habilitada = this.lotacaoTreinamento(treinamento);
                            break;
                            default:
                                console.log('default',treinamento);
                        }
                        if(habilitada){
                            break;
                        }
                    }
                    return habilitada;
                },
                treinamentoValidaData:function(treinamento){
                    var habilitada = false;                    
                    if (treinamento.data != null) {
                        var dtT = treinamento.data.split('-');
                        var passouData = new Date(dtT[0], (dtT[1] - 1), dtT[2]) - new Date();
                        habilitada = passouData > 0 ? false : true;
                    }
                    return habilitada;
                },
                lotacaoTreinamento: function (treinamento){
                    var habilitada = false;  
                    if (treinamento.data != null) {
                        habilitada = treinamento.lotacao - treinamento.colaboradores.length <= 0 ? true : false;
                    }
                    return habilitada;
                },
                desCandidatarHabilitado: function (usuario, treinamento){
                    // treinamento.colaboradores
                    var desCandidatar = true;
                    if (treinamento.colaboradores!=null){
                        for (var i = 0; i < treinamento.colaboradores.length; i++) {
                            if (usuario.matricula == treinamento.colaboradores[i].matricula) {
                                desCandidatar = false;
                            }                            
                        }
                    }
                    return desCandidatar;
                },
                getPerguntasTreinamento:function(treinamento){
                    var perguntasProm = $q.defer();
                    var idTreinamento = treinamento.id;
                    var perguntas = null;
                    for (var i = 0; i < avaliacoes.length;i++){
                        if (avaliacoes[i].idTreinamento == idTreinamento){
                            perguntas = avaliacoes[i];
                            perguntasProm.resolve(perguntas);
                        }
                    }
                    if (perguntas==null){
                        perguntasProm.reject([]);
                    }
                    return perguntasProm.promise;
                },
                calculaResultado:function(treinamento){
                    var qtdPerguntas = treinamento.perguntas.length;
                    var corretas = 0;
                    for (var i = 0; i < qtdPerguntas;i++){
                        corretas = corretas + treinamento.perguntas[i].resultado
                    }
                    var resultado = (corretas * 100) / qtdPerguntas;
                    return resultado;
                }
            }
        }
    )