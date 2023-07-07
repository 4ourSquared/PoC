"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lampioneSchema_1 = __importDefault(require("../lampioneSchema"));
const lampRouter = (0, express_1.Router)();
// Array di test per i lampioni
let lampioni_test = [];
lampRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lampioni = yield lampioneSchema_1.default.find();
        res.status(200).json(lampioni);
    }
    catch (error) {
        console.error("Errore durante il recupero dei lampioni dal database:", error);
        res.status(500).send("Errore durante il recupero dei lampioni dal database");
    }
}));
lampRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const lampione = yield lampioneSchema_1.default.findOne({ id: parseInt(id, 10) });
        if (lampione) {
            res.status(200).json(lampione);
        }
        else {
            res.status(404).json({ error: "Lampione non trovato." });
        }
    }
    catch (error) {
        console.error("Errore durante il recupero del lampione dal database:", error);
        res.status(500).send("Errore durante il recupero del lampione dal database");
    }
}));
// Creazione di un nuovo lampione
lampRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stato, lum, luogo } = req.body;
    const id = yield generateId();
    const new_lamp = new lampioneSchema_1.default({
        id,
        stato,
        lum: parseInt(lum, 10),
        luogo,
    });
    try {
        const savedLamp = yield new_lamp.save();
        res.status(200).json(savedLamp);
    }
    catch (error) {
        console.error("Errore durante l'inserimento del lampione nel database:", error);
        res.status(500).send("Errore durante l'inserimento del lampione nel database");
    }
}));
function generateId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield lampioneSchema_1.default.countDocuments().exec();
            return count + 1;
        }
        catch (error) {
            console.error("Errore durante il recupero del conteggio dei documenti:", error);
            throw new Error("Errore durante la generazione dell'ID incrementale");
        }
    });
}
exports.default = lampRouter;
