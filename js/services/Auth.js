//Palvelu Autentikaation hoitamiseen Firebasen kanssa
App.service('AuthenticationService', function ($firebase, $firebaseAuth, $route, $window, $http) {
    var firebaseRef = new Firebase('https://ostoskassi.firebaseio.com/');
    var firebaseAuth = $firebaseAuth(firebaseRef);

    this.getEmail = function () {
        var kirjautuminen = this.onkoKirjautunut();
        if (kirjautuminen != undefined) {
            return kirjautuminen.password.email;
        }
        return "eiKirjautunut";
    }

    this.onkoKayttajaAdmin = function () {
        var remote = $.ajax({
            type: "GET",
            url: 'https://intense-tundra-7058.herokuapp.com/kayttaja/' + this.getEmail(),
            async: false
        }).responseText;
               
        return remote;
    }

    this.onkoKirjautunut = function () {
        return firebaseAuth.$getAuth();
    }

    this.kirjauduUlos = function () {
        firebaseAuth.$unauth();
        $window.location.reload();
    };

    this.kirjaudu = function (email, password) {
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
        $window.location.reload();
    }

    this.rekisteroidy = function (email, password) {
        this.lahetaKayttajaTietokantaan(email);
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });

    }

    this.lahetaKayttajaTietokantaan = function (email) {
        var lisattava = {
            email: email,
        };

        $.ajax({
            url: "https://intense-tundra-7058.herokuapp.com/kayttaja/",
            type: "POST",
            crossDomain: true,
            data: lisattava,
            dataType: "json"
        })
    }
});