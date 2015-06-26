//Kontrolleri tilauksen tietojen näyttämiseen ja päivittämiseen
App.controller('TilauksentiedotController', function ($scope, $http, $routeParams, $route, OstosService, $location) {

    $scope.tavarat = {};
    $scope.tilausTiedot = {};

    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/').
            success(function (data) {
                $scope.tavarat = data;
            });

    $http.get('https://intense-tundra-7058.herokuapp.com/tilaustiedot/' + $routeParams.idn).
            success(function (data) {
                $scope.tilausTiedot = data;
            });


    $scope.etsiTavaraByID = function (id) {
        for (var i = 0; i < $scope.tavarat.length; i++) {
            if ($scope.tavarat[i].id === id) {
                return $scope.tavarat[i];
            }
        }
    }

    $scope.laskeHinta = function (id, kpl) {
        for (var i = 0; i < $scope.tavarat.length; i++) {
            if ($scope.tavarat[i].id === id) {
                var k = $scope.tavarat[i];
            }
        }
        return k.hinta * kpl;
    }

    paivitaHinta = function () {
        var lisattava = {
            hinta: $scope.yhteissumma(),
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tilaus/" + $routeParams.idn + "/hinta",
            type: "POST",
            crossDomain: true,
            data: lisattava,
            dataType: "json"
        });
    }

    $scope.yhteissumma = function () {
        var yhteensa = 0;
        for (var i = 0; i < $scope.tilausTiedot.length; i++) {
            var osto = $scope.tilausTiedot[i];
            yhteensa += ($scope.laskeHinta(osto.tavaraid, osto.kpl));
        }
        return yhteensa;
    }

    $scope.vahenna = function (Tilaus) {
        var monta = $scope.tilausTiedot[$.inArray(Tilaus, $scope.tilausTiedot)].kpl;
        if (monta == 1) {
            var sijainti = $.inArray(Tilaus, $scope.tilausTiedot);
            $scope.tilausTiedot.splice(sijainti, 1);
            var varma = confirm("Haluatko varmasti poistaa tuotteen tilauksesta?");
            if (varma) {
                $.ajax({
                    url: "https://intense-tundra-7058.herokuapp.com/tilaustiedot/" + Tilaus.id,
                    type: "DELETE",
                    crossDomain: true,
                });
                paivitaHinta();
                if ($scope.tilausTiedot.length === 0) {
                    $.ajax({
                        url: "https://intense-tundra-7058.herokuapp.com/tilaus/" + $routeParams.idn,
                        type: "DELETE",
                        crossDomain: true,
                    });

                    $location.path('/tilaukset');
                }
            }
        } else {
            $scope.tilausTiedot[$.inArray(Tilaus, $scope.tilausTiedot)].kpl = monta - 1;
            $.ajax({
                url: "https://intense-tundra-7058.herokuapp.com/tilaustiedot/" + Tilaus.id + "/vahenna",
                type: "POST",
                crossDomain: true,
            });
            paivitaHinta();
        }
    }

    $scope.lisaa = function (Tilaus) {
        var monta = $scope.tilausTiedot[$.inArray(Tilaus, $scope.tilausTiedot)].kpl;
        $scope.tilausTiedot[$.inArray(Tilaus, $scope.tilausTiedot)].kpl = monta + 1;

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tilaustiedot/" + Tilaus.id + "/lisaa",
            type: "POST",
            crossDomain: true,
        });

        paivitaHinta();
    }

});



