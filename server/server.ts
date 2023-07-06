import express, { Request, Response } from "express";
import { Lampione } from "./models/lampione";
import lampioneRoutes from "./routes/lampioneRoutes";

/*
    SERVER: questo file al momento rappresenta il server in tutto e per tutto. Al suo interno si trovano tutti i metodi attualmente sviluppati per la gestione delle richieste in arrivo
            dal client    
*/

/*
------------------------------------------------------------------------------
                        CONFIGURAZIONE DEL SERVER
------------------------------------------------------------------------------
*/
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
------------------------------------------------------------------------------
                        COLLEGAMENTO AL DATABASE
------------------------------------------------------------------------------
*/
import mongoose from "mongoose";

const mongoURI = "mongodb://poc-db-1:27017/lumosminima";
const options : any = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoURI, options);
mongoose.pluralize(null);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Errore di connessione MongoDB:"));
db.once("open", () => {
  console.log("Connessione a MongoDB avvenuta con successo");
});

import LampioneModel from "./lampioneSchema";



/*
------------------------------------------------------------------------------
                              CONFIGURAZIONE API
------------------------------------------------------------------------------
*/
app.listen(port, () => {
  console.log("Il server è in ascolto sulla porta 5000");
});

// Accesso alla pagina
app.get("/", (req, res) => {
  console.log("Ricevuta richiesta GET su /");
  res.status(200).send();
});

// Collegamento alle route per i lampioni
app.use("/api/lampioni", lampioneRoutes);
