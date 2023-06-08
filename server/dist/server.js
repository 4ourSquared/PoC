"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lampione_1 = require("./models/lampione");
/*
    SERVER: questo file al momento rappresenta il server in tutto e per tutto. Al suo interno si trovano tutti i metodi attualmente sviluppati per la gestione delle richieste in arrivo
            dal client
*/
// Config del Server
const bodyParser = require("body-parser"); // Per il parsing del body delle richieste HTTP
const cors = require("cors"); // Per la configurazione di un certificato valido che permetta lo scambio di informazioni tra due endpoint senza l'utilizzo di proxy
const app = (0, express_1.default)(); // Per il routing e il middleware
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Array contenente i lampioni generati - solo per test, rimuovere in produzione
let lampioni_test = [];
// Metodi per API REST
// Porta di ascolto predefinita per il server
app.listen(port, () => {
    console.log("Il server è in ascolto sulla porta 5000");
});
// Accesso alla pagina
app.get("/", (req, res) => {
    console.log("Ricevuta richiesta GET su /");
    res.status(200).send();
});
// Recupero delle informazioni di tutti i lampioni inseriti a sistema
app.get("/api/lampioni", (req, res) => {
    console.log("Ricevuta richiesta GET su /api/lampioni -> RETRIEVE ALL DATA");
    res.status(200).json(lampioni_test);
});
// Richiesta di informazioni per un determinato lampione
app.get("/api/lampioni/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Ricevuta richiesta GET su /api/lampioni -> ID: ${id}`);
    // Trova il lampione con l'ID specificato
    const lampione = lampioni_test.find((lamp) => lamp.getId() === id);
    if (lampione) {
        res.status(200).json(lampione);
    }
    else {
        res.status(404).json({ error: "Lampione non trovato." });
    }
});
// Richiesta per la creazione e l'inserimento di un nuovo lampione a sistema
app.post("/api/lampioni", (req, res) => {
    const id = parseInt(req.body.id, 10);
    const stato = req.body.stato;
    const lum = parseInt(req.body.lum, 10);
    const luogo = req.body.luogo;
    const new_lamp = new lampione_1.Lampione(id, stato, lum, luogo);
    console.log(typeof id + `: ${id}`);
    console.log(typeof stato + `: ${stato}`);
    console.log(typeof lum + `: ${lum}`);
    console.log(typeof luogo + `: ${luogo}`);
    console.log("Richiesta aggiunta di un nuovo lampione");
    console.log(new_lamp);
    lampioni_test.push(new_lamp);
    console.log(typeof id + `: ${id}`);
    console.log(typeof stato + `: ${stato}`);
    console.log(typeof lum + `: ${lum}`, lum); // Add lum value to the log
    console.log(typeof luogo + `: ${luogo}`);
    res.status(200).send("Lampione aggiunto con successo");
});
