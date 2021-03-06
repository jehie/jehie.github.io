//Kontrolleri kirjautumiseen ja rekisteröitymiseen
App.controller('UserController', function ($scope, $location, AuthenticationService, $window) {
    

    $scope.rekisteroidy = function () {
        AuthenticationService.rekisteroidy($scope.uusiSahkoposti, $scope.uusiSalasana)
                .then(function () {
                    AuthenticationService.kirjaudu($scope.uusiSahkoposti, $scope.uusiSalasana)
                            .then(function () {
                                $location.path('/');
                                $window.location.reload();
                            });
                })
                .catch(function () {
                    $scope.message = 'Virhe, yritä uudelleen! Tarkista sähköpostisi muoto!';
                });
    }

    $scope.kirjaudu = function () {
        AuthenticationService.kirjaudu($scope.sahkoposti, $scope.salasana)
                .then(function () {
                    $location.path('/');
                    $window.location.reload();
                })
                .catch(function () {
                    $scope.message = 'Väärä sähköpostiosoite tai salasana!'
                });
    }


});