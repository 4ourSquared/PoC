import express, {Request, Response} from 'express';

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Qui andrebbero inseriti almeno due array, uno per i lampioni e uno per i sensori

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Ricevuta richiesta GET su /')
    res.status(200).send();
});

app.get('/api/lampioni', (req, res) => {
    console.log('Ricevuta richiesta GET su /api/lampioni');
    res.status(200).send();
});

app.get('/info/lampioni', (req, res) =>{
    console.log(`Ricevuta richiesta GET su /info/lampioni&id=${req.query.id}`);
    res.status(200).send();
})

app.listen(port , () => {
    console.log('Il server è in ascolto sulla porta 5000');
});

//SEZIONE DI PROVA - ELIMINARE PRIMA DELLA PUBBLICAZIONE
app.get('/info/lampioni/:id', (req, res) =>{
    console.log(`ID: ${req.params.id}`);
    res.status(200).send();
})

