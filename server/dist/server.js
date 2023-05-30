"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lampione_1 = require("./models/lampione");
// Config del Server
const bodyParser = require('body-parser');
const cors = require('cors');
const app = (0, express_1.default)();
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Array contenente i lampioni generati - solo per test, rimuovere in produzione
let lampioni_test = [];
// Metodi per API REST
app.get('/', (req, res) => {
    console.log('Ricevuta richiesta GET su /');
    res.status(200).send();
});
app.get('/api/lampioni', (req, res) => {
    console.log('Ricevuta richiesta GET su /api/lampioni -> RETRIEVE ALL DATA');
    res.status(200).json(lampioni_test);
});
app.listen(port, () => {
    console.log('Il server è in ascolto sulla porta 5000');
});
// Richiesta di informazioni per un determinato lampione
app.get('/api/lampioni/:id', (req, res) => {
    console.log(`Ricevuta richiesta GET su /api/lampioni -> ID: ${req.params.id}`);
    res.status(200).send();
});
app.post('/api/lampioni', (req, res) => {
    const id = parseInt(req.body.id, 10);
    const stato = req.body.stato;
    const intensita = parseInt(req.body.intensita, 10);
    const luogo = req.body.luogo;
    const new_lamp = new lampione_1.Lampione(id, stato, intensita, luogo);
    console.log(typeof (id) + `: ${id}`);
    console.log(typeof (stato) + `: ${stato}`);
    console.log(typeof (intensita) + `: ${intensita}`);
    console.log(typeof (luogo) + `: ${luogo}`);
    console.log('Richiesta aggiunta di un nuovo lampione');
    console.log(new_lamp);
    lampioni_test.push(new_lamp);
    res.status(200).send("Lampione aggiunto con successo");
});
