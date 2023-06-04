import express, {Request, Response} from 'express';
import { Lampione } from './models/lampione';

/*
    SERVER: questo file al momento rappresenta il server in tutto e per tutto. Al suo interno si trovano tutti i metodi attualmente sviluppati per la gestione delle richieste in arrivo
            dal client    
*/

// Config del Server
const bodyParser = require('body-parser');      // Per il parsing del body delle richieste HTTP
const cors = require('cors');                   // Per la configurazione di un certificato valido che permetta lo scambio di informazioni tra due endpoint senza l'utilizzo di proxy

const app = express();                          // Per il routing e il middleware
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Array contenente i lampioni generati - solo per test, rimuovere in produzione
let lampioni_test : Lampione[] = [];


// Metodi per API REST
// Porta di ascolto predefinita per il server
app.listen(port , () => {
    console.log('Il server è in ascolto sulla porta 5000');
});

// Accesso alla pagina
app.get('/', (req, res) => {
    console.log('Ricevuta richiesta GET su /')
    res.status(200).send();
});

// Recupero delle informazioni di tutti i lampioni inseriti a sistema
app.get('/api/lampioni', (req, res) => {
    console.log('Ricevuta richiesta GET su /api/lampioni -> RETRIEVE ALL DATA');
    res.status(200).json(lampioni_test);
});

// Richiesta di informazioni per un determinato lampione
app.get('/api/lampioni/:id', (req, res) =>{
    console.log(`Ricevuta richiesta GET su /api/lampioni -> ID: ${req.params.id}`);
    res.status(200).send();
});

// Richiesta per la creazione e l'inserimento di un nuovo lampione a sistema
app.post('/api/lampioni', (req, res) =>{
    const id : number = parseInt(req.body.id, 10);
    const stato : string = req.body.stato;
    const intensita : number = parseInt(req.body.intensita, 10);
    const luogo : string = req.body.luogo;
    const new_lamp = new Lampione(id, stato, intensita, luogo);

    console.log(typeof(id) + `: ${id}`);
    console.log(typeof(stato) + `: ${stato}`);
    console.log(typeof(intensita) + `: ${intensita}`);
    console.log(typeof(luogo) + `: ${luogo}`);

    console.log('Richiesta aggiunta di un nuovo lampione');
    console.log(new_lamp);
    lampioni_test.push(new_lamp);

    res.status(200).send("Lampione aggiunto con successo");
})

