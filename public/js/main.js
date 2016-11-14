angular.module('app', ['directives', 'ngAnimate', 'ngTable', 'ngRoute', 'meusServicos', 'ui.bootstrap'])
    .config(function($routeProvider, $locationProvider, $httpProvider){

        $httpProvider.interceptors.push('tokenInterceptor');

        $locationProvider.html5Mode(true);
        $routeProvider.when('/index', {
            templateUrl: 'partials/index/index.html',
            controller: 'IndexController'
        });

        $routeProvider.when('/fotos', {
            templateUrl: 'partials/fotos/listar-fotos.html',
            controller: 'FotosController'
        });

        $routeProvider.when('/fotos/new', {
            templateUrl: 'partials/fotos/foto.html',
            controller: 'FotosController'
        });

        $routeProvider.when('/fotos/view/:fotoId', {
            templateUrl: 'partials/fotos/visualizar-foto.html',
            controller: 'FotosController'
        });

        $routeProvider.when('/fotos/edit/:fotoId', {
            templateUrl: 'partials/fotos/foto.html',
            controller: 'FotosController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'partials/login/login.html',
            controller: 'LoginController'
        });

        $routeProvider.when('/logout', {
            template: '',
            controller: 'LogoutController'
        });

        $routeProvider.otherwise({redirectTo: '/index'});
    });
