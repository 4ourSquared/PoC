"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lampioneRoutes_1 = __importDefault(require("./routes/lampioneRoutes"));
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
const app = (0, express_1.default)(); // Per il routing e il middleware
const port = 5000;
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/*
------------------------------------------------------------------------------
                        COLLEGAMENTO AL DATABASE
------------------------------------------------------------------------------
*/
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = "mongodb://poc-db-1:27017/lumosminima";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(mongoURI, options);
mongoose_1.default.pluralize(null);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "Errore di connessione MongoDB:"));
db.once("open", () => {
    console.log("Connessione a MongoDB avvenuta con successo");
});
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
// Collegamento alle route per i lampioni
app.use("/api/lampioni", lampioneRoutes_1.default);
