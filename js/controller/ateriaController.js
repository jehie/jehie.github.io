App.controller('AteriaController', function ($scope, $http, $routeParams, $route) {

    $http.get('https://intense-tundra-7058.herokuapp.com/ateria/').
            success(function (data) {

                $scope.Ateriat = data;
                console.log($scope.Ateriat);
            });


    $scope.poista = function (poistettava) {

        var pois = {
            id: poistettava
        }
        console.log(poistettava)
        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/ateria/" + poistettava,
            type: 'DELETE',
            crossDomain: true,
            success: update
        });
        
        
    }
    
   function update(){
        $route.reload();
    }


    $scope.lisaa = function () {

        var lisattava = {
            nimi: $scope.ateria.nimi,
            hinta: $scope.ateria.hinta,
            kuvaus: $scope.ateria.kuvaus,
            Aterianvalmistaja_id: $scope.ateria.valmistaja_id,
            saatavilla: "false",          

        };
        
        console.log(lisattava)

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

