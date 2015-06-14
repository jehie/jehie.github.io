var App = angular.module('Ostoskassi', ['firebase', 'ngRoute']);

App.run(function (AuthenticationService, $rootScope) {
    $rootScope.kirjauduUlos = function () {
        console.log("Kirjauduutaan ulos")
        AuthenticationService.kirjauduUlos();

    };

    $rootScope.kirjautunut = AuthenticationService.onkoKirjautunut();
});



App.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/etusivu.html'
            })
            .when('/tavarat', {
                controller: 'TavaraController',
                templateUrl: 'views/tavarat.html'
            })
            .when('/tavarat/:idn', {
                controller: 'TavaranController',
                templateUrl: 'views/tavara.html'
            })
            .when('/ateriat', {
                controller: 'AteriaController',
                templateUrl: 'views/ateriat.html'

            })
            .when('/ateriat/:idn', {
                controller: 'AterianController',
                templateUrl: 'views/ateria.html'
            })
            .when('/ostoskori', {
                controller: 'ostosController',
                templateUrl: 'views/ostoskori.html'

            })

            .when('/kirjaudu', {
                controller: 'UserController',
                templateUrl: 'views/kirjaudu.html'
            })
            .when('/rekisteroidy', {
                controller: 'UserController',
                templateUrl: 'views/rekisteroidy.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});