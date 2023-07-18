"use strict";
/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative alle aree illuminate in arrivo al server
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
const areaSchema_1 = __importDefault(require("../areaSchema"));
const lampioneSchema_1 = __importDefault(require("../lampioneSchema"));
const areaSchema_2 = __importDefault(require("../areaSchema"));
const areaRouter = (0, express_1.Router)();
areaRouter.get("/:idA/lampioni/:idL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Ricevuta richiesta per info lampione specifico");
    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);
    console.log(idA, idL);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            console.log("Area trovata: ", idA);
            const lampione = area.lampioni.find((lamp) => lamp.id === parseInt(idL));
            if (lampione) {
                console.log("Lampione trovato: ", idL);
                res.status(200).json(lampione);
            }
            else {
                res.status(404).json({ error: "Lampione non trovato" });
            }
        }
        else {
            res.status(404).json({ error: "Area non trovata" });
        }
    }
    catch (error) {
        console.error("Errore durante il recupero del lampione:", error);
        res.status(500).send("Errore durante il recupero del lampione");
    }
}));
areaRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aree = yield areaSchema_1.default.find();
        res.status(200).json(aree);
    }
    catch (error) {
        console.error("Errore durante il recupero delle aree illuminate dal database:", error);
        res.status(500).send("Errore durante il recupero delle aree illuminate dal database");
    }
}));
areaRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield areaSchema_1.default.findOne({ id: parseInt(id, 10) });
        if (area) {
            res.status(200).json(area);
        }
        else {
            res.status(404).json({ error: "Area illuminata non trovato." });
        }
    }
    catch (error) {
        console.error("Errore durante il recupero dell'area illuminata dal database:", error);
        res.status(500).send("Errore durante il recupero dell'area illuminata dal database");
    }
}));
areaRouter.get("/:id/lampioni", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield areaSchema_1.default.findOne({ id: parseInt(id, 10) });
        if (area) {
            console.log("Area trovata");
            res.status(200).json(area.lampioni);
        }
        else {
            res.status(404).json({ error: "Area non trovata." });
        }
    }
    catch (error) {
        console.error("Errore durante il recupero dei lampioni dall'area dal database:", error);
        res.status(500).send("Errore durante il recupero dei lampioni dall'area dal database");
    }
}));
areaRouter.get("/:id/sensori", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield areaSchema_1.default.findOne({ id: parseInt(id, 10) });
        if (area) {
            res.status(200).json(area.sensori);
        }
        else {
            res.status(404).json({ error: "Area non trovata." });
        }
    }
    catch (error) {
        console.error("Errore durante il recupero dei sensori dall'area dal database:", error);
        res.status(500).send("Errore durante il recupero dei sensori dall'area dal database");
    }
}));
areaRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, descrizione, latitudine, longitudine, sensori, lampioni } = req.body;
    const id = yield generateIdAree();
    const newArea = new areaSchema_1.default({
        id,
        nome,
        descrizione,
        latitudine,
        longitudine,
        sensori,
        lampioni,
    });
    try {
        const savedArea = yield newArea.save();
        res.status(200).json(savedArea);
    }
    catch (error) {
        console.error("Errore durante l'inserimento dell'area illuminata nel database:", error);
        res.status(500).send("Errore durante l'inserimento dell'area illuminata nel database");
    }
}));
function generateIdAree() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const maxId = yield areaSchema_1.default.findOne()
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
areaRouter.put("/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const areaToUpdate = yield areaSchema_1.default.findOne({ id });
        console.log(`Ricevuta richiesta PUT su /api/aree/edit -> ID: ${id}`);
        console.log("Richiesta aggiornamento di un'area illuminata esistente");
        if (!areaToUpdate) {
            res.status(404).send(`Area con id = ${id} non trovato`);
            return;
        }
        if (req.body.nome !== undefined) {
            areaToUpdate.nome = req.body.nome;
        }
        if (req.body.descrizione !== undefined) {
            areaToUpdate.descrizione = req.body.descrizione;
        }
        if (req.body.latitudine !== undefined) {
            areaToUpdate.latitudine = req.body.latitudine;
        }
        if (req.body.longitudine !== undefined) {
            areaToUpdate.longitudine = req.body.longitudine;
        }
        //manca la parte dei sensori e dei lampioni
        yield areaToUpdate.save();
        res.status(200).send(`Area illuminata con id = ${id} aggiornato con successo`);
    }
    catch (error) {
        console.error("Errore durante l'aggiornamento dell'area illuminata:", error);
        res.status(500).send("Errore durante l'aggiornamento dell'area illuminata");
    }
}));
areaRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield areaSchema_1.default.deleteOne({ id });
        if (result.deletedCount === 0) {
            res.status(404).send(`Area illuminata con id = ${id} non trovato`);
            return;
        }
        res.status(200).send(`Area illuminata con id = ${id} eliminato con successo`);
    }
    catch (error) {
        console.error("Errore durante l'eliminazione dell'area illuminata:", error);
        res.status(500).send("Errore durante l'eliminazione dell'area illuminata");
    }
}));
areaRouter.post("/:id/lampioni", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recupero ID area
        const { id } = req.params;
        // Recupero Area
        const areaMod = yield areaSchema_1.default.findOne({ id: id });
        if (!areaMod) {
            res.status(400).json({ error: "Errore nel recupero dell'area" });
        }
        else {
            // Recupero nuovo lampione dalla richiesta
            const { stato, lum, luogo, area } = req.body;
            const id = yield generateLampId(area);
            const newLamp = new lampioneSchema_1.default({
                id,
                area: parseInt(area, 10),
                stato,
                lum: parseInt(lum, 10),
                luogo,
            });
            // Aggiunta del lampione all'array dell'area
            areaMod.lampioni.push(newLamp.toObject());
            const savedLampione = areaMod.save();
            res.status(200).json(savedLampione);
        }
    }
    catch (error) {
        console.error("Errore durante il recupero delle aree illuminate dal database:", error);
        res.status(500).send("Errore durante il recupero delle aree illuminate dal database");
    }
}));
function generateLampId(areaId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const area = yield areaSchema_2.default.findOne({ id: areaId }).exec();
            if (!area) {
                throw new Error(`Area con ID ${areaId} non trovata.`);
            }
            const newLampId = area.lampioni.length + 1;
            return newLampId;
        }
        catch (error) {
            console.error("Errore durante la generazione dell'ID del lampione:", error);
            throw error;
        }
    });
}
exports.default = areaRouter;
