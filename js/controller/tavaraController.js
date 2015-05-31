App.controller('TavaraController', function ($scope, $http, $routeParams) {




    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/').
            success(function (data) {

                $scope.tavarat = data;
                console.log($scope.tavarat);
            });


    $scope.lisaa = function () {
        
        var lisattava = {
				nimi : $scope.tavara.nimi,
				hinta : $scope.tavara.hinta,
				kuvaus : $scope.tavara.kuvaus,
                                valmistaja_id : $scope.tavara.valmistaja_id,
                                saatavilla : "false",
                                varastossa: "125"
                       
		};
        
        
        console.log($scope.tavara.hinta)
        console.log($scope.tavara.nimi)
        
        $http.post('https://intense-tundra-7058.herokuapp.com/tavara/', lisattava);
    };



//  $scope.tavarat = [
//        {
//            id: 1,
//            nimi: 'Rolex',
//            hinta: '55', 
//        },
//        {
//            id: 2,
//            nimi: 'Lautanen',
//            hinta: '25', 
//        }
//    ];


//    $scope.tav = [
//        {
//            id: 1,
//            nimi: 'Rolex',
//            hinta: '55',
//        }];
});


