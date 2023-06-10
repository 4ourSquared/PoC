import express, { Request, Response } from "express";
import { Lampione } from "./models/lampione";

/*
    SERVER: questo file al momento rappresenta il server in tutto e per tutto. Al suo interno si trovano tutti i metodi attualmente sviluppati per la gestione delle richieste in arrivo
            dal client    
*/

// Config del Server

const cors = require("cors"); // Per la configurazione di un certificato valido che permetta lo scambio di informazioni tra due endpoint senza l'utilizzo di proxy

const app = express(); // Per il routing e il middleware
const port = 5000;

app.use(cors());
app.use(express.json()); //body-parser già incluso in express, eliminata l'installazione
app.use(express.urlencoded({ extended: false }));

// Array contenente i lampioni generati - solo per test, rimuovere in produzione
let lampioni_test: Lampione[] = [];

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
  } else {
    res.status(404).json({ error: "Lampione non trovato." });
  }
});

// Funzione (sarà da spostare in cartella apposita) per generare un id
// incrementale per il lampione
// PRE: lampioni_test deve essere un array di Lampione

function generateId() {
  const maxId =
    lampioni_test.length > 0
      ? Math.max(...lampioni_test.map((lamp) => lamp.getId()))
      : 0;
  return maxId + 1;
}
// POST: ritorna un id incrementale e lo assegna al lampione, verificando sempre
// la presenza di eventuali altri id nei lampioni già presenti

// Richiesta per la creazione e l'inserimento di un nuovo lampione a sistema
app.post("/api/lampioni", (req, res) => {
  const { stato, lum, luogo } = req.body; //Semplificata la richiesta e l'inserimento dei dati
  const id: number = generateId();
  const new_lamp = new Lampione(id, stato, parseInt(lum, 10), luogo);

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
