import express, {Request, Response} from 'express';
import { Lampione } from './models/lampione';

// Config del Server
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Array contenente i lampioni generati - solo per test, rimuovere in produzione
let lampioni_test :Lampione[] = [];


// Metodi per API REST
app.get('/', (req, res) => {
    console.log('Ricevuta richiesta GET su /')
    res.status(200).send();
});

app.get('/api/lampioni', (req, res) => {
    console.log('Ricevuta richiesta GET su /api/lampioni -> NO ID');
    res.status(400).send();
});

app.listen(port , () => {
    console.log('Il server è in ascolto sulla porta 5000');
});

// Richiesta di informazioni per un determinato lampione
app.get('/api/lampioni/:id', (req, res) =>{
    console.log(`Ricevuta richiesta GET su /info/lampioni -> ID: ${req.params.id}`);
    res.status(200).send();
});

app.post('/api/lampioni', (req, res) =>{
    const new_lamp = req.body;

    console.log('Richiesta aggiunta di un nuovo lampione');
    console.log(new_lamp);
    lampioni_test.push(new_lamp);

    res.status(200).send("Lampione aggiunto con successo");
})

