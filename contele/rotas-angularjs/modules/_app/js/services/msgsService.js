angular.module('rotasAngularJs')
    .service('msgsService', [function() {
        return {
            getIdioma: function() {
                var idioma = sessionStorage.getItem('idioma');
                if (idioma == undefined || idioma == null) {
                    idioma = "portugues";
                }
                return idioma;
            },
            getMsg: function(modulo, idMsg) {
                var idioma = this.getIdioma();
                var msgs = {
                    "portugues": {
                        "usuario": {
                            "1": "Usuário ou senha incorretos, por favor tente novamente!",
                            "2": "Usuário já cadastrado!",
                            "3": "Usuário removido!"
                        },
                        "app": {
                            "1": "Dados salvos com sucesso!",
                            "2": "Problemas de conexão com a internet. Por favor, tente novamente mais tarde!",
                            "3": "Ocorreu um erro inesperado. Por favor, tente novamente ou contate nosso suporte!",
                            "4": "Por favor, aguarde...",
                            "5": "Dados de sessão corrompidos. Por favor, faça o login novamente!",
                            "6": "Preencha todos os campos corretamente!",
                            "7": "Tipo de arquivo inválido!",
                            "8": "Não foram encontrados dados para os filtros selecionados!",
                            "10": "Nenhum dado encontrado!",
                            "11": "Sua sessão expirou, por favor faça o login novamente!"
                        },
                    },
                    "ingles": {
                        "usuario": {
                            "1": "Incorrect CPF or password, please try again!"
                        },
                        "app": {
                            "1": "Data saved successfully!",
                            "2": "Problems connecting to the internet. Please try again later!",
                            "3": "An unexpected error has occurred. Please try again or contact our support!",
                            "4": "Please wait...",
                            "5": "Session data corrupted. Please, login again!",
                            "6": "Complete all the fields correctly!",
                            "7": "Invalid file type!",
                            "8": "No data was found for the selected filters!",
                            "10": "No data found, please try again later!"
                        }
                    },
                    "espanhol": {
                        "usuario": {
                            "1": "CPF o contraseña incorrecta, por favor inténtelo de nuevo!"
                        },
                        "app": {
                            "1": "Datos guardados con éxito!",
                            "2": "Problemas de conexión a Internet. Por favor, inténtelo de nuevo más tarde!",
                            "3": "Se ha producido un error inesperado. Por favor, inténtelo de nuevo o contacte nuestro soporte!",
                            "4": "Por favor, espere ...",
                            "5": "Datos de sesión dañados. Por favor, inicie sesión de nuevo!",
                            "6": "Rellena todos los campos correctamente!",
                            "7": "Tipo de archivo no válido!",
                            "8": "No se han asignado datos a los filtros seleccionados!",
                            "10": "Ningún dato encontrado, vuelva a intentarlo más tarde!"
                        }
                    }
                };
                return msgs[idioma][modulo][idMsg];
            }
        }
    }])