angular.module('directives', [])
.directive('topBar', function () {
    // directive definition object (DDO)
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {};
    ddo.templateUrl = 'js/directives/top-bar.html';

    return ddo;
})
.directive('menuNavegation', function () {
    // directive definition object (DDO)
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {};
    ddo.templateUrl = 'js/directives/menu-navegation.html';

    return ddo;
})
.directive('footer', function(){
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {};
    ddo.templateUrl = 'js/directives/footer-bar.html';

    return ddo;
})
.directive('buttonAction', function(){
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {
        edit: "@",
        view: "@",
        remove: "&"
    };
    ddo.templateUrl = 'js/directives/button-action.html';

    return ddo;
})
.directive('minhaFoto', function () {
    // directive definition object (DDO)
    var ddo = {};

    ddo.restrict = "AE";
    ddo.scope = {
        url: '@url',
        titulo: '@titulo'
    };
    ddo.templateUrl = 'js/directives/minha-foto.html';

    return ddo;
})
.directive('meuFocus', function() {
    var ddo = {};
    ddo.restrict = "A";
    //ddo.scope = {
    //    focado : '='
    //};
    ddo.link = function(scope, element) {

        scope.$on('fotoCadastrada', function() {
            element[0].focus();
        });

        //scope.$watch('focado', function() {
        //    if (scope.focado) {
        //        element[0].focus();
        //        scope.focado = false;
        //    }
        //});
    };

    return ddo;
})
.directive('meusTitulos', function() {
    var ddo = {};
    ddo.restrict = 'E';
    ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
    ddo.controller = function($scope, recursoFoto) {
        recursoFoto.query(function(fotos) {
            $scope.titulos = fotos.map(function(foto) {
                return foto.titulo;
            });
        });
    };
    return ddo;
})
.directive('atualizar', ['$route', '$templateCache', function($route, $templateCache) {
    return {
        restrict: 'E',
        scope: {
            atualizar: "&"
        },
        link: function(scope, elem, attrs) {
            scope.atualizando = function () {
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            }
        },
        template: '<li style="margin-top:22px;"><a href="#" ng-click="atualizando()"><span> Atualizar </span></a></li>'
    }
}]);
