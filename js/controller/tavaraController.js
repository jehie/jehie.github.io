App.controller('TavaraController', function ($scope, $http, $routeParams) {




    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/').
            success(function (data) {

                $scope.tavarat = data;
                console.log($scope.tavarat);
            });


    $scope.poista = function (poistettava) {

        var pois = {
            id: poistettava
        }
        console.log(poistettava)
        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tavara/" + poistettava,
            type: 'DELETE',
            crossDomain: true,
        });
    }


    $scope.lisaa = function () {

        var lisattava = {
            nimi: $scope.tavara.nimi,
            hinta: $scope.tavara.hinta,
            kuvaus: $scope.tavara.kuvaus,
            valmistaja_id: $scope.tavara.valmistaja_id,
            saatavilla: "false",
            varastossa: "125"

        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/tavara/",
            type: "POST",
            crossDomain: true,
            data: lisattava,
            dataType: "json"
        });

    };

});


