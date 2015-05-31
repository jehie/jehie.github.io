App.controller('TavaranController', function ($scope, $http, $routeParams) {




    $http.get('https://intense-tundra-7058.herokuapp.com/tavara/').
            success(function (data) {

                $scope.tavarat = data;
                console.log($scope.tavarat);

                if ($scope.tavarat[$routeParams.idn.toLowerCase()-1]) {
                    $scope.tavara = $scope.tavarat[$routeParams.idn.toLowerCase()-1];
                } else {
                    $scope.tavara = null;
                }
            });

});
