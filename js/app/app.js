var App = angular.module('Ostoskassi', ['ngRoute']);


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
            .when('/ostoskori', {
                controller: 'ostosController',
                templateUrl: 'views/ostoskori.html'

            })

            .when('/kirjaudu', {
                templateUrl: 'views/kirjaudu.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});