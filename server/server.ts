import express, {Request, Response} from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('SERVER UP -- ROOT');
});

app.get('/api/lampioni', (req, res) => {
    res.send('SERVER UP -- API LAMPIONI');
});

app.listen(port , () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});
