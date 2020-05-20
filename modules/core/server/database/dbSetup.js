const db = require('./db.js');

function sinhronizacijaBezInicijalizacije() {
    return db.sequelize.sync({force: true});
}

function sinhronizacija(){ 
    sinhronizacijaBezInicijalizacije()
        .then(function(){
        inicializacija()
            .then(function(){
                console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        });
    });
}

function inicializacija(){
    var gradoviPromises=[];
    return new Promise(function(resolve,reject){
        gradoviPromises.push(db.grad.create({naziv:'Sarajevo', broj_stanovnika: 400000}));
        gradoviPromises.push(db.grad.create({naziv:'Tuzla', broj_stanovnika: 300000}));
        gradoviPromises.push(db.grad.create({naziv:'Zenica', broj_stanovnika: 250000}));
    });
}

exports.sinhronizacija = sinhronizacija;
exports.inicializacija = inicializacija;
exports.sinhronizacijaBezInicijalizacije = sinhronizacijaBezInicijalizacije;
