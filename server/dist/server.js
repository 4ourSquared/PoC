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
// AGGIUNTO SOLO NEL TS
const cors = require("cors"); // Per la configurazione di un certificato valido che permetta lo scambio di informazioni tra due endpoint senza l'utilizzo di proxy
const app = (0, express_1.default)(); // Per il routing e il middleware
const port = 5000;
app.use(cors());
app.use(express_1.default.json()); //body-parser già incluso in express, eliminata l'installazione
app.use(express_1.default.urlencoded({ extended: false }));
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
// Funzione (sarà da spostare in cartella apposita) per generare un id
// incrementale per il lampione
// PRE: lampioni_test deve essere un array di Lampione
function generateId() {
    const maxId = lampioni_test.length > 0
        ? Math.max(...lampioni_test.map((lamp) => lamp.getId()))
        : 0;
    return maxId + 1;
}
// POST: ritorna un id incrementale e lo assegna al lampione, verificando sempre
// la presenza di eventuali altri id nei lampioni già presenti
// Richiesta per la creazione e l'inserimento di un nuovo lampione a sistema
app.post("/api/lampioni", (req, res) => {
    const { stato, lum, luogo } = req.body; //Semplificata la richiesta e l'inserimento dei dati
    const id = generateId();
    const new_lamp = new lampione_1.Lampione(id, stato, parseInt(lum, 10), luogo);
    console.log(typeof id + `: ${id}`);
    console.log(typeof stato + `: ${stato}`);
    console.log(typeof lum + `: ${lum}`);
    console.log(typeof luogo + `: ${luogo}`);
    console.log("Richiesta aggiunta di un nuovo lampione");
    console.log(new_lamp);
    lampioni_test.push(new_lamp);
    res.status(200).send("Lampione aggiunto con successo");
});
// Richiesta per eliminare un lampione dal sistema
app.delete("/api/lampioni/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const lampToDelete = lampioni_test.find((lamp) => lamp.getId() === id); //Individua il lampione con id richiesto
    if (lampToDelete === undefined) {
        res.status(404).send(`Lampione con id = ${id} non trovato`);
    }
    else {
        const idx = lampioni_test.indexOf(lampToDelete);
        lampioni_test.splice(idx, 1); //Elimina gli elementi tra idx e il numero indicato, in questo caso 1 solo elemento
        res.status(200).send(`Lampione con id = ${id} eliminato con successo`);
    }
});
// Richiesta per aggiornare i dati di un lampione nel sistema
// Aggiunto /edit/:id per evitare conflitti con la richiesta di info di un
// singolo lampione
app.put("/api/lampioni/edit/:id", (req, res) => {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare
    const lampToUpdate = lampioni_test.find((lamp) => lamp.getId() === id);
    console.log(`Ricevuta richiesta PUT su /api/lampioni -> ID: ${id}`);
    console.log("Richiesta aggiornamento di un lampione esistente");
    if (lampToUpdate === undefined) {
        res.status(404).send(`Lampione con id = ${id} non trovato`);
    }
    else {
        if (req.body.stato !== undefined) {
            lampToUpdate.setStato(req.body.stato);
        }
        if (req.body.lum !== undefined) {
            lampToUpdate.setLum(parseInt(req.body.lum, 10));
        }
        if (req.body.luogo !== undefined) {
            lampToUpdate.setLuogo(req.body.luogo);
        }
        res.status(200).send(`Lampione con id = ${id} aggiornato con successo`);
    }
});
// Richiesta per ottenere l'id dell'ultimo lampione inserito: serve per mostrare
// nel form l'id che verrà inserito nel successivo lampione
/* DA SISTEMARE PER RTB
app.get("/api/lampioni/last", (req, res) => {
  const idLastLamp = lampioni_test[lampioni_test.length - 1].getId();
  if (idLastLamp === undefined || idLastLamp === null) {
    res.send(200).send(0);
  } else {
    res.status(200).send(idLastLamp);
  }
});*/
