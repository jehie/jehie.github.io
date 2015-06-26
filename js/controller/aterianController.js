//Kontrolleri tietyn aterian näyttämiseen ja päivittämiseen
App.controller('AterianController', function ($scope, $http, $routeParams, $route) {

    $scope.paivita = function () {

        var lisattava = {
            hinta: muokattavaAteria.hint.value,
            kuvaus: muokattavaAteria.kuv.value,
            saatavilla: muokattavaAteria.saat.value,
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/ateria/" + $scope.id,
            type: "POST",
            crossDomain: true,
            data: lisattava,
            dataType: "json"
        });

        update();

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


            });

    function aseta() {
        $scope.nimi = $scope.ateria.nimi;
        $scope.hinta = $scope.ateria.hinta;
        $scope.kuvaus = $scope.ateria.kuvaus;
        $scope.saatavilla = $scope.ateria.saatavilla;
        $scope.lisatty = $scope.ateria.lisatty;
        $scope.id = $scope.ateria.id;
    }

});