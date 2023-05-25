"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.get('/', (req, res) => {
    res.send('SERVER UP -- ROOT');
});
app.get('/api/lampioni', (req, res) => {
    res.send('SERVER UP -- API LAMPIONI');
});
app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});
