App.service('AuthenticationService', function ($firebase, $firebaseAuth) {
    var firebaseRef = new Firebase('https://ostoskassi.firebaseio.com/');
    var firebaseAuth = $firebaseAuth(firebaseRef);


    this.onkoKirjautunut = function () {
        return firebaseAuth.$getAuth();
    }

    this.kirjauduUlos = function () {
        firebaseAuth.$unauth();
    };

    this.kirjaudu = function (email, password) {
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
    }

    this.rekisteroidy = function (email, password) {
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
    }
});