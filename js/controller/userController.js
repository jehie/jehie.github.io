App.controller('UserController', function ($scope, $location, AuthenticationService) {


    $scope.rekisteroidy = function () {
        console.log("rekist");
        AuthenticationService.rekisteroidy($scope.uusiSahkoposti, $scope.uusiSalasana)
                .then(function () {
                    AuthenticationService.kirjaudu($scope.uusiSahkoposti, $scope.uusiSalasana)
                            .then(function () {
                                $location.path('/tavarat');
                            });
                })
                .catch(function () {
                    $scope.message = 'Virhe, yritä uudelleen';
                });
    }

    $scope.kirjaudu = function () {
        AuthenticationService.kirjaudu($scope.sahkoposti, $scope.salasana)
                .then(function () {
                    $location.path('/tavarat');
                })
                .catch(function () {
                    $scope.message = 'Väärä sähköpostiosoite tai salasana!'
                });
    }


});