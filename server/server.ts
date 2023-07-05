import express, { Request, Response } from "express";
import Lampione, { ILampione } from "./models/lampione";



/*
    SERVER: questo file al momento rappresenta il server in tutto e per tutto. Al suo interno si trovano tutti i metodi attualmente sviluppati per la gestione delle richieste in arrivo
            dal client    
*/

/*
------------------------------------------------------------------------------
                        CONFIGURAZIONE DEL SERVER
------------------------------------------------------------------------------
*/
const cors = require("cors"); // Per la configurazione di un certificato valido che permetta lo scambio di informazioni tra due endpoint senza l'utilizzo di proxy
const app = express(); // Per il routing e il middleware
const port = 5000;
app.use(cors());
app.use(express.json()); //body-parser già incluso in express, eliminata l'installazione
app.use(express.urlencoded({ extended: false }));


/*
------------------------------------------------------------------------------
                        COLLEGAMENTO AL DATABASE
------------------------------------------------------------------------------
*/
import mongoose, { Schema, Document } from 'mongoose';

const mongoURI = "mongodb://poc-db-1:27017/lumosminima";

mongoose.connect(mongoURI, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Errore di connessione MongoDB:"));
db.once("open", () => {
  console.log("Connessione a MongoDB avvenuta con successo");
  retrieveLampioni();
});


/*
------------------------------------------------------------------------------
                                ARRAY DI TEST
------------------------------------------------------------------------------
*/
let lampioni_test: ILampione[] = [];

async function retrieveLampioni() {
  try {
    const lampioni: ILampione[] = await Lampione.find().exec();
    lampioni_test = lampioni;
    lampioni_test.forEach(lampione => {
      console.log(lampione);
    });
    console.log("Lampioni recuperati con successo");
    return lampioni_test; // Restituisce i lampioni recuperati
  } catch (error) {
    console.error("Errore durante il recupero dei lampioni:", error);
    throw error; // Rilancia l'errore per gestirlo in un'altra parte se necessario
  }
}


// Importazione dei lampioni (fino a che non vengono aggiunti i modelli del sensore e delle aree)


/*
------------------------------------------------------------------------------
                              CONFIGURAZIONE API
------------------------------------------------------------------------------
*/
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
app.get("/api/lampioni", async (req, res) => {
  console.log("Ricevuta richiesta GET su /api/lampioni -> RETRIEVE ALL DATA");

  try {
    const lampioni = await retrieveLampioni();
    res.status(200).json(lampioni);
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero dei lampioni" });
  }
});

// Richiesta di informazioni per un determinato lampione
app.get("/api/lampioni/:id", (req, res) => {
  const id = parseInt(req.params.id);

  console.log(`Ricevuta richiesta GET su /api/lampioni -> ID: ${id}`);

  // Trova il lampione con l'ID specificato
  const lampione = lampioni_test.find((lamp) => lamp.id === id);

  if (lampione) {
    res.status(200).json(lampione);
  } else {
    res.status(404).json({ error: "Lampione non trovato." });
  }
});


/*
------------------------------------------------------------------------------
                        GESTIONE RECUPERO LAMPIONI
------------------------------------------------------------------------------
*/
// Funzione (sarà da spostare in cartella apposita) per generare un id
// incrementale per il lampione
// PRE: lampioni_test deve essere un array di Lampione

function generateId() {
  const maxId =
    lampioni_test.length > 0
      ? Math.max(...lampioni_test.map((lamp) => lamp.id))
      : 0;
  return maxId + 1;
}
// POST: ritorna un id incrementale e lo assegna al lampione, verificando sempre
// la presenza di eventuali altri id nei lampioni già presenti

// Richiesta per la creazione e l'inserimento di un nuovo lampione a sistema
app.post("/api/lampioni", async (req, res) => {
  const { stato, lum, luogo } = req.body;
  const id: number = generateId();

  try {
    const newLampione: ILampione = new Lampione({
      id: id,
      stato: stato,
      lum: parseInt(lum, 10),
      luogo: luogo
    });

    const savedLampione: ILampione = await newLampione.save();
    console.log("Lampione aggiunto con successo:", savedLampione);

    res.status(200).json(savedLampione);
  } catch (error) {
    console.error("Errore durante l'aggiunta del lampione:", error);
    res.status(500).json({ error: "Errore durante l'aggiunta del lampione" });
  }
});
