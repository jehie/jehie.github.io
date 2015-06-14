App.controller('TavaranController', function ($scope, $http, $routeParams, $route) {

    $scope.paivita = function () {
        console.log($scope.kirjautunut)

        var lisattava = {
            nimi: $scope.nimi,
            hinta: $scope.hinta,
            kuvaus: $scope.kuvaus,
            valmistaja_id: $scope.valmistaja_id,
            saatavilla: "false",
            varastossa: $scope.varastossa

        };


        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tavara/" + $scope.tavara.id,
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


    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/').
            success(function (data) {

                $scope.tavarat = data;

                for (var i = 0; i < $scope.tavarat.length; i++) {
                    if ($scope.tavarat[i].id == $routeParams.idn.toLowerCase()) {
                        $scope.tavara = $scope.tavarat[i];
                        aseta();
                    } else {
                        $scope.tavara = null;
                    }
                }
            });

    function aseta() {
        $scope.nimi = $scope.tavara.nimi;
        $scope.kuvaus = $scope.tavara.kuvaus;
        $scope.hinta = $scope.tavara.hinta;
        $scope.saatavilla = $scope.tavara.saatavilla;
        $scope.valmistaja_id = $scope.tavara.valmistaja_id;
        $scope.varastossa = $scope.tavara.varastossa;
    }

});
