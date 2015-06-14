App.controller('AterianController', function ($scope, $http, $routeParams, $route) {

    $scope.paivita = function () {
        console.log($scope.kirjautunut)

        var lisattava = {
            nimi: $scope.nimi,
            hinta: $scope.hinta,
            kuvaus: $scope.kuvaus,
            AterianValmistaja_id: $scope.valmistaja_id,
            saatavilla: "false",

        };


        //$http.post('https://intense-tundra-7058.herokuapp.com/tavara/', lisattava);

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/ateria/" + $scope.ateria.id,
            type: "POST",
            crossDomain: true,
            data: lisattava,
            success: update,
            dataType: "json"
        })

    };


    function update() {
        $route.reload();
    }


    $http.get('https://intense-tundra-7058.herokuapp.com/ateria/').
            success(function (data) {

                $scope.ateriat = data;

                for (var i = 0; i < $scope.ateriat.length; i++) {
                    if ($scope.ateriat[i].id == $routeParams.idn.toLowerCase()) {
                        $scope.ateria = $scope.ateriat[i];
                        aseta();
                    } else {
                        $scope.ateria = null;
                    }
                }

//                if ($scope.tavarat[$routeParams.idn.toLowerCase() - 1]) {
//                    $scope.tavara = $scope.tavarat[$routeParams.idn.toLowerCase() - 1];
//                    aseta();
//                } else {
//                    $scope.tavara = null;
//                }
            });

    function aseta() {
        $scope.nimi = $scope.ateria.nimi;
        $scope.kuvaus = $scope.ateria.kuvaus;
        $scope.hinta = $scope.ateria.hinta;
        $scope.saatavilla = $scope.ateria.saatavilla;
        $scope.valmistaja_id = $scope.ateria.aterianvalmistaja_id;
    }

});