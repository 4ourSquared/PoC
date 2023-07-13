import express, { Request, Response } from "express";
import { Lampione } from "./models/lampione";
import lampioneRoutes from "./routes/lampioneRoutes";
import { Sensore } from "./models/sensore";
import sensoreRoutes from "./routes/sensoreRoutes";
import { Area } from "./models/area";
import areaRoutes from "./routes/areaRoutes";



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

// Collegamento alle route per i lampioni
app.use("/api/lampioni", lampioneRoutes);

// Collegamento alla route per i sensori
app.use("/api/sensori", sensoreRoutes);

// Collegamento alla route per i sensori
app.use("/api/aree", areaRoutes);

// Accesso alla pagina
app.get("/", (req, res) => {
  console.log("Ricevuta richiesta GET su /");
  res.status(200).send();
});

// Porta di ascolto predefinita per il server
app.listen(port, () => {
  console.log("Il server è in ascolto sulla porta 5000");
});