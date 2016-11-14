angular.module('app').controller('FotosController',
['$scope', 'NgTableParams', 'recursoFoto', '$routeParams', 'cadastroDeFotos', 'modalService',
function($scope, NgTableParams, recursoFoto, $routeParams, cadastroDeFotos, modalService){


    $scope.fotos = [];
    $scope.mensagem = '';

    recursoFoto.query(
        function(data){
            $scope.fotos = data;
            $scope.tableParams = new NgTableParams({},{ counts: [], dataset: data });
        },
        function(erro){
            console.log(erro);
        }
    );

    if ($routeParams.fotoId) {

        recursoFoto.get({fotoId : $routeParams.fotoId},
            function(data) {
                $scope.foto = data;
            },
            function (erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a foto'
            }
        );
    }

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            cadastroDeFotos.cadastrar($scope.foto)
                .then(function(dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) {
                        $scope.foto = {};
                        $scope.formulario.$setPristine()
                    };
                })
                .catch(function(erro) {
                    $scope.mensagem = erro.mensagem;
                });
        }
    };

    $scope.remover = function(foto){

        var modalOptions = {
            closeButtonText: 'Cancela',
            actionButtonText: 'Remover',
            headerText: 'Deseja remover ' + foto.titulo + '?',
            bodyText: 'Tem certeza que deseja remover?'
        };
        modalService.showModal({}, modalOptions)
            .then(function (result) {
                console.log(result);
                recursoFoto.delete({fotoId : foto._id},
                    function(){
                        var indiceDaFoto = $scope.fotos.indexOf(foto);
                        $scope.fotos.splice(indiceDaFoto, 1);
                        $scope.tableParams.reload();
                        $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
                    },
                    function(erro){
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
                    }
                );
            });
    };
}]);