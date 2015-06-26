//Kontrolleri aterioiden listaamiseen ja lisäämiseen
App.controller('AteriaController', function ($scope, $http, $routeParams, $route, OstosService, $location) {

    $scope.Ateriat = {};
    $scope.TilattujenID = {};
    
    $http.get('https://intense-tundra-7058.herokuapp.com/ateria/').
            success(function (data) {
                $scope.Ateriat = data;
            });

    //Hakee tilattujen Aterioiden ID:n REST-palvelusta
    $http.get('https://intense-tundra-7058.herokuapp.com/ateria/tilatut').
            success(function (data) {
                $scope.TilattujenID = data;
            });

    //Poistaa Aterian REST-palvelun avulla
    $scope.poista = function (poistettava) {

        var pois = {
            id: poistettava
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/ateria/" + poistettava,
            type: 'DELETE',
            crossDomain: true,
            success: update
        });


    }

    //Tarkistaa onko Ateriaa jo tilattu ja palauttaa true jos on.
    $scope.onkoAteriaTilattu = function (tuote) {
        for (var i = 0, max = $scope.TilattujenID.length; i < max; i++) {
            if (tuote === $scope.TilattujenID[i].id) {
                return true;
            }
        }
        return false;
    }

    //Lataa sivun uudelleen
    function update() {
        $route.reload();
    }

    //Asettaa valitun aterian ostosserviceen
    $scope.valitseAteria = function (ateria) {
        OstosService.setAteria(ateria);
        $location.path('/ostoskori');
    }

    //Lisää uuden Aterian
    $scope.lisaa = function () {

        var lisattava = {
            nimi: $scope.ateria.nimi,
            hinta: $scope.ateria.hinta,
            kuvaus: $scope.ateria.kuvaus,
            saatavilla: $scope.ateria.saatavilla,
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/ateria/",
            type: "POST",
            crossDomain: true,
            data: lisattava,
            success: update,
            dataType: "json",
        });
        update()
    };

});

