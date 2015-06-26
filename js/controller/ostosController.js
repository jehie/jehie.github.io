//Ostoskorin hallintaan käytettävä Kontrolleri
App.controller('ostosController', function ($scope, OstosService, $location, $http, AuthenticationService, $route) {

    $http.get('https://intense-tundra-7058.herokuapp.com/lento/').
            success(function (data) {
                $scope.lennot = data;
            });


    $scope.valittuLento = "Valitse!"
    $scope.Ostokset = OstosService.getOstoskori();
    $scope.Ateria = OstosService.getAteria();
    
    $scope.valitseAteria = function () {
        $location.path('/ateriat');
    }

    $scope.jatkaOstoksia = function () {
        $location.path('/tavarat');
    }

    $scope.tarpeeksiOstoksia = function () {
        var os = $scope.Ostokset.length;
        if (os > 0) {
            return true;
        } else {
            return false;
        }
    }

    var postitaTuotteet = function (tavaraID, kpl) {
        var lisattava = {
            email: AuthenticationService.getEmail(),
            kpl: kpl,
            tavaraID: tavaraID,
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tilaustiedot/",
            type: "POST",
            crossDomain: true,
            data: lisattava,
            dataType: "json",
        });
    }

    $scope.tilaa = function () {
        var varma = confirm("Oletko varma?");
        if (varma) {
            
            var ateriaID = $scope.Ateria.id;
            
            if($scope.Ateria.id===undefined){
                ateriaID=1;
            }

            var lisattava = {
                email: AuthenticationService.getEmail(),
                hinta: $scope.yhteissumma(),
                lentoID: $scope.valittuLento,
                ateriaID: ateriaID
            };

            $.ajax({
                url: "https://intense-tundra-7058.herokuapp.com/tilaus/",
                type: "POST",
                crossDomain: true,
                data: lisattava,
                dataType: "json",
            });
            
            for (var i = 0; i < $scope.Ostokset.length; i++) {
                var tuoteID = $scope.Ostokset[i].id;
                var kpl = $scope.Ostokset[i].kpl;
                postitaTuotteet(tuoteID, kpl);
            }
            OstosService.nollaaAteria();
            OstosService.nollaaOstoskori();
            $location.path('/tilaukset');
        }
    }

    $scope.ateriaValittu = function () {

        if ($scope.Ateria.nimi !== undefined) {
            return true;
        } else {
            return false;
        }
    }


    $scope.vahenna = function (ostos) {
        var sijainti = $scope.Ostokset[$.inArray(ostos, $scope.Ostokset)];
        var monta = $scope.Ostokset[$.inArray(ostos, $scope.Ostokset)].kpl;

        if (monta == 1) {
            $scope.Ostokset.splice(sijainti, 1);
        } else {
            $scope.Ostokset[$.inArray(ostos, $scope.Ostokset)].kpl = monta - 1;

        }

        OstosService.setOstoskori($scope.Ostokset);
    }

    $scope.lisaa = function (ostos) {
        var monta = $scope.Ostokset[$.inArray(ostos, $scope.Ostokset)].kpl;
        $scope.Ostokset[$.inArray(ostos, $scope.Ostokset)].kpl = monta + 1;
    }

    $scope.yhteissumma = function () {
        var yhteensa = 0;
        for (var i = 0; i < $scope.Ostokset.length; i++) {
            var osto = $scope.Ostokset[i];
            yhteensa += (osto.hinta * osto.kpl);
        }

        if ($scope.Ateria.hinta != undefined) {
            yhteensa = yhteensa + $scope.Ateria.hinta;
        }

        return yhteensa;
    }

});


