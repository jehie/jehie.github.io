App.service('LentoService', function ($http) {
     var lennot = "";
    return {
        getLennot: function () {

            $http.get('https://intense-tundra-7058.herokuapp.com/lento/').
                    success(function (data) {
                        lennot = data;
                    });
           return lennot;
        }

    }
});


