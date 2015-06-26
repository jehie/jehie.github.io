//Tavararoiden listaamiseen ja lisäämiseen käytetty Angular Controller
App.controller('TavaraController', function ($scope, $http, $routeParams, $route, OstosService, AuthenticationService) {

    $scope.ostokset = [];
    $scope.TilattujenID = [];
    $scope.tavaranValmistajat = {};

    $scope.korissa = false;
    $scope.viimeisinTuote = "";

    //Hakee tietokannasta löytyvät Tavarat REST-palvelusta
    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/').
            success(function (data) {
                $scope.tavarat = data;
            });

    //Hakee tietokannasta löytyvät Tavaran valmistajat
    $http.get('https://intense-tundra-7058.herokuapp.com/tavaranvalmistaja/').
            success(function (data) {
                $scope.tavaranValmistajat = data;
                console.log( $scope.tavaranValmistajat)
            });

    //Hakee tilattujen tuotteiden ID:n REST-palvelusta
    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/tilatut').
            success(function (data) {
                $scope.TilattujenID = data;
            });

    //Tarkistaa onko tuotetta jo tilattu ja palauttaa true jos on.
    $scope.onkoTuoteTilattu = function (tuote) {
        for (var i = 0, max = $scope.TilattujenID.length; i < max; i++) {
            if (tuote === $scope.TilattujenID[i].id) {
                return true;
            }
        }
        return false;
    }

    //Lisää valitun tuotteen Ostoskoriin
    $scope.lisaaKoriin = function (lisattava) {

        $scope.viimeisinTuote = lisattava;
        $scope.korissa = true;
        var sijainti = $.inArray(lisattava, $scope.ostokset);
        if (sijainti != -1) {
            var monta = $scope.ostokset[sijainti].kpl;
            monta++;
            $scope.ostokset[sijainti].kpl = monta;
        } else {
            lisattava.kpl = 1;
            $scope.ostokset.push(lisattava);

        }
        OstosService.setOstoskori($scope.ostokset);
        //console.log($scope.ostokset)
    }

    //Lähettää DELETE pyynnön ja poistaa halutun tuotteen
    $scope.poista = function (poistettava) {

        var pois = {
            id: poistettava
        }
        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tavara/" + poistettava,
            type: 'DELETE',
            crossDomain: true,
            success: update
        });
    }

    //Päivittää sivun
    function update() {
        $route.reload();
    }

    //Lisää uuuden Tavaran POST-pyynnöllä
    $scope.lisaa = function () {
        
        console.log($scope.tavara.valmistaja_id)

        var lisattava = {
            nimi: $scope.tavara.nimi,
            hinta: $scope.tavara.hinta,
            kuvaus: $scope.tavara.kuvaus,
            valmistaja_id: $scope.tavara.valmistaja_id,
            saatavilla: $scope.tavara.saatavilla,
            varastossa: $scope.tavara.varastossa
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tavara/",
            type: "POST",
            crossDomain: true,
            data: lisattava,
            success: update,
            dataType: "json",
        });
        update();
    };
});


