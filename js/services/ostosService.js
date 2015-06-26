//Palvelu ostoskorin siirtämiseen eri kontrollerienn välillä
App.service('OstosService', function () {
    var ostosKori = [];
    var valittuAteria = [];
    
    return {
        getOstoskori: function () {
            return ostosKori;
        },
        setOstoskori: function (uusiKori) {
            ostosKori = uusiKori;
        },
        nollaaOstoskori : function () {
            ostosKori = [];
        },
        nollaaAteria : function () {
            valituaAteria = [];
        },    
        getAteria: function () {
            return valittuAteria;
        },
        
        setAteria: function (ateria) {
            valittuAteria = ateria;
        }
  
    }
});


