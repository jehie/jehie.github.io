//Kontrolleri Tilausten listaamiseen ja poistamiseen
App.controller('TilausController', function ($scope, $http, $routeParams, $route, OstosService, LentoService, AuthenticationService) {

    $scope.admin = AuthenticationService;
    $scope.ateriat = {};
    $scope.tilaukset = {};
    $scope.sahkoposti= $scope.getEmail;

    $http.get('https://intense-tundra-7058.herokuapp.com/ateria/').
            success(function (data) {
                $scope.ateriat = data;
            });
            if ($scope.onkoAdmin === 'false') {
               
    $http.get('https://intense-tundra-7058.herokuapp.com/tilaus/' + $scope.getEmail).
            success(function (data) {
                $scope.tilaukset = data;
            });
            }
    if ($scope.onkoAdmin === 'true') {
        $scope.sahkoposti= "Kaikkien tilaajien ";
        $http.get('https://intense-tundra-7058.herokuapp.com/tilaus/').
                success(function (data) {
                    $scope.tilaukset = data;
                });
    }

    $scope.etsiAteriaByID = function (id) {
        for (var i = 0; i < $scope.ateriat.length; i++) {
            if ($scope.ateriat[i].id === id) {
                return $scope.ateriat[i].nimi;
            }
        }
    }

    $scope.toimitaTilaus = function (tilausID) {
        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tilaus/" + tilausID + "/toimita",
            type: 'POST',
            crossDomain: true,
            success: update
        });
    }


    $scope.poistaTilaus = function (tilausID) {
        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tilaus/" + tilausID,
            type: 'DELETE',
            crossDomain: true,
            success: update
        });
    }

    function update() {
        $route.reload();
    }

});



