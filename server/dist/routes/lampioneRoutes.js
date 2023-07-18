"use strict";
/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative ai lampioni in arrivo al server
*/
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
const lampioneSchema_1 = __importDefault(require("../schemas/lampioneSchema"));
const lampRouter = (0, express_1.Router)();
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
lampRouter.get("/guasti", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lampioni = yield lampioneSchema_1.default.find({ guasto: true });
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
    try {
        const id = yield generateId();
        const newLampione = new lampioneSchema_1.default({
            id,
            stato,
            lum: parseInt(lum, 10),
            luogo,
            guasto: false
        });
        const savedLampione = yield newLampione.save();
        res.status(200).json(savedLampione);
    }
    catch (error) {
        console.error("Errore durante l'inserimento del lampione nel database:", error);
        res.status(500).send("Errore durante l'inserimento del lampione nel database");
    }
}));
function generateId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const maxId = yield lampioneSchema_1.default.findOne()
                .sort({ id: -1 })
                .select("id")
                .exec();
            return maxId ? maxId.id + 1 : 1;
        }
        catch (error) {
            console.error("Errore durante il recupero dell'ultimo ID:", error);
            throw new Error("Errore durante la generazione dell'ID incrementale");
        }
    });
}
// Richiesta per aggiornare i dati di un lampione nel sistema
lampRouter.put("/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare
    try {
        const lampToUpdate = yield lampioneSchema_1.default.findOne({ id: id });
        console.log(`Ricevuta richiesta PUT su /api/lampioni/edit -> ID: ${id}`);
        console.log("Richiesta aggiornamento di un lampione esistente");
        if (!lampToUpdate) {
            res.status(404).send(`Lampione con id = ${id} non trovato`);
            return;
        }
        if (req.body.stato !== undefined) {
            lampToUpdate.stato = req.body.stato;
        }
        if (req.body.lum !== undefined) {
            lampToUpdate.lum = parseInt(req.body.lum, 10);
        }
        if (req.body.luogo !== undefined) {
            lampToUpdate.luogo = req.body.luogo;
        }
        yield lampToUpdate.save();
        res.status(200).send(`Lampione con id = ${id} aggiornato con successo`);
    }
    catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
}));
lampRouter.put("/guasti/add/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare
    try {
        const lampToUpdate = yield lampioneSchema_1.default.findOne({ id: id });
        console.log(`Ricevuta richiesta PUT su /api/lampioni/setguasto -> ID: ${id}`);
        console.log("Richiesto toggle per la lista guasti di un lampione esistente");
        if (!lampToUpdate) {
            res.status(404).send(`Lampione con id = ${id} non trovato!`);
            return;
        }
        if (!lampToUpdate.guasto)
            lampToUpdate.guasto = true;
        else {
            res.status(409).send(`Lampione con id = ${id} già presente nella lista guasti!`);
            return;
        }
        yield lampToUpdate.save();
        res.status(200).send(`Lampione con id = ${id} trasferito nella lista guasti con successo`);
    }
    catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
}));
// Richiesta per eliminare un lampione dal sistema
lampRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield lampioneSchema_1.default.deleteOne({ id: id });
        if (result.deletedCount === 0) {
            res.status(404).send(`Lampione con id = ${id} non trovato`);
            return;
        }
        res.status(200).send(`Lampione con id = ${id} eliminato con successo`);
    }
    catch (error) {
        console.error("Errore durante l'eliminazione del lampione:", error);
        res.status(500).send("Errore durante l'eliminazione del lampione");
    }
}));
exports.default = lampRouter;
