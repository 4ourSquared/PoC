import express, {Request, Response} from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    console.log('Ricevuta richiesta GET su /')
    res.send('SERVER UP -- ROOT');
});

app.get('/api/lampioni', (req, res) => {
    console.log('Ricevuta richiesta GET su /api/lampioni');
    res.send('SERVER UP -- API LAMPIONI');
});

app.listen(port , () => {
    console.log('Il server è in ascolto sulla porta 5000');
});

