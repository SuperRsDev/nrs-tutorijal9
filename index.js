
const fs = require('fs'),
express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
dbSetup = require('./modules/core/server/database/dbSetup'),
gradUpiti = require('./modules/pocetna/server/upiti.servis'),
rute = require('./rute'),
app = express();

function registerStaticRoute(route, path) {
    app.get(route, function (req, res) {
        res.sendFile(path);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

console.info("Registrovanje ruta za assete i stranice")
/*pageSetupData.pageMappings.forEach((page) => {
    const modulePath = `${__dirname}/modules${page.modulePath}/client`;
    fs.readdirSync(modulePath).forEach((moduleFile) => {
        const extension = path.extname(moduleFile);
        const isAsset = page.assetTypes.find(s => `.${s}` === extension) !== undefined;
        if (isAsset) {
            const route = `/${moduleFile}`;
            const assetPath = path.join(modulePath, moduleFile);
            console.info("Registrovan asset: ", moduleFile)
            registerStaticRoute(route, assetPath);
        }
    })

    // Ruta za html fajl
    if (page.id != null) {
        const pageRoute = `/${page.id}`;
        const pagePath = `${__dirname}/modules${page.path}`;
        console.info("Registrovana stranica: ", pageRoute);
        registerStaticRoute(pageRoute, pagePath);
    }
});*/


// Rute vezane za dobavljanje gradova
app.get(rute.gradovi.bazna, function(req, res) {
    gradUpiti.dajGradove()
        .then((data) => {
            res.json(data);
        });
});

app.post(rute.gradovi.single, function(req, res) {
    const grad = { naziv: req.body.naziv, broj_stanovnika: req.body.broj_stanovnika };
    // Provjera podataka
    if (!grad.naziv || !grad.broj_stanovnika ) {
        return res.status(400).json({
            message: 'Neispravni podaci poslati'
        })
    }
    gradUpiti.dodajGrad(grad)
        .then((data) => {
            res.json(data);
        });
});

app.put(rute.getById(rute.gradovi.bazna), function(req, res) {
    const grad = { naziv: req.body.naziv, brojStanovnika: req.body.broj_stanovnika };
    gradUpiti.updateGrad(req.params.id, grad)
        .then((data) => {
            res.json(data);
        });
});

app.get(rute.getById(rute.gradovi.bazna), function(req, res) {
    gradUpiti.dajGrad(req.params.id)
        .then((data) => {
            res.json(data)
        });
});

app.delete(rute.getById(rute.gradovi.bazna), function(req, res) {
    gradUpiti.obrisiGrad(req.params.id)
        .then((data) => {
            res.json(data)
        });
});

const port =  8080;
app.listen(port, () => {
    dbSetup.sinhronizacija();
    console.log(`Aplikacija pokrenuta na ${port}!`)
});

module.exports = app;
