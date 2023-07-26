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
const sensoreSchema_1 = __importDefault(require("../sensoreSchema"));
const areaRouter = (0, express_1.Router)();
/*
 * ------------------------------------------------------------------------------------------*
 *                                                                                           *
 *                                      LAMPIONI                                             *
 *                                                                                           *
 * ------------------------------------------------------------------------------------------*
 */
areaRouter.put("/:idA/lampioni/guasti/:idL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            const lampione = area.lampioni.find((lamp) => lamp.id === parseInt(idL));
            if (lampione) {
                if (!lampione.guasto) {
                    lampione.guasto = true;
                }
                else {
                    res.status(409).send(`Lampione con id = ${idL} già presente nella lista guasti!`);
                    return;
                }
                yield area.save();
                res.status(200).send(`Lampione con id = ${idL} segnalato come guasto`);
                return;
            }
            else {
                res.status(404).send(`Lampione con id = ${idL} non trovato`);
            }
        }
    }
    catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
}));
areaRouter.put("/:idA/lampioni/guasti/remove/:idL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            const lampione = area.lampioni.find((lamp) => lamp.id === parseInt(idL));
            if (lampione) {
                if (lampione.guasto) {
                    lampione.guasto = false;
                }
                else {
                    res.status(409).send(`Lampione con id = ${idL} non era presente nella lista guasti!`);
                    return;
                }
                yield area.save();
            }
        }
    }
    catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
}));
areaRouter.get("/:idA/lampioni/guasti/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lampioni = yield lampioneSchema_1.default.find({ guasto: true });
        res.status(200).json(lampioni);
    }
    catch (error) {
        console.error("Errore durante il recupero dei lampioni dal database:", error);
        res.status(500).send("Errore durante il recupero dei lampioni dal database");
    }
}));
// RICHIESTA INFORMAZIONI SINGOLO LAMPIONE
areaRouter.get("/:idA/lampioni/:idL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            const lampione = area.lampioni.find((lamp) => lamp.id === parseInt(idL));
            if (lampione) {
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
// RICHIESTA INFORMAZIONI DI TUTTI I LAMPIONI DELL'AREA
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
// RICHIESTA AGGIUNTA LAMPIONE
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
                guasto: false
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
// RICHIESTA MODIFICA LAMPIONE
areaRouter.put("/:idA/lampioni/edit/:idL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);
    console.log(`Ricevuta richiesta PUT su /api/aree/${idA}/lampioni/${idL}/edit -> ID: ${idL}`);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            const lampione = area.lampioni.find((lamp) => lamp.id === parseInt(idL));
            if (lampione) {
                if (req.body.stato !== undefined) {
                    lampione.stato = req.body.stato;
                }
                if (req.body.lum !== undefined) {
                    lampione.lum = parseInt(req.body.lum, 10);
                }
                if (req.body.luogo !== undefined) {
                    lampione.luogo = req.body.luogo;
                }
                yield area.save();
                res.status(200).send(`Lampione con id = ${idL} modificato con successo`);
            }
            else {
                res.status(404).send(`Lampione con id = ${idL} non trovato`);
            }
        }
    }
    catch (error) {
        console.error("Errore durante la modifica del lampione:", error);
        res.status(500).send("Errore durante la modifica del lampione");
    }
}));
// RICHIESTA ELIMINAZIONE LAMPIONE
areaRouter.delete("/:idA/lampioni/:idL", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idA, idL } = req.params;
    parseInt(idA, 10);
    parseInt(idL, 10);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (!area) {
            res.status(404).send("Errore nel recupero dell'area illuminata");
            return;
        }
        else {
            area.lampioni = area.lampioni.filter((lamp) => lamp.id !== parseInt(idL));
            yield area.save();
            res.status(200).send("Lampione eliminato con successo");
        }
    }
    catch (error) {
        console.error("Errore durante l'eliminazione del lampione:", error);
        res.status(500).send("Errore durante l'eliminazione del lampione");
    }
}));
// GENERAZIONE ID INCREMENTALE PER LAMPIONI
function generateLampId(areaId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const area = yield areaSchema_1.default.findOne({ id: areaId }).exec();
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
/*
 * ------------------------------------------------------------------------------------------*
 *                                                                                           *
 *                                       SENSORI                                             *
 *                                                                                           *
 * ------------------------------------------------------------------------------------------*
 */
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
areaRouter.get("/:idA/sensori/:idS", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idA = req.params.idA;
    const idS = req.params.idS;
    parseInt(idA, 10);
    parseInt(idS, 10);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            const sensore = area.sensori.find((sens) => sens.id === parseInt(idS));
            if (sensore) {
                res.status(200).json(sensore);
            }
            else {
                res.status(404).json({ error: "Sensore non trovato" });
            }
        }
        else {
            res.status(404).json({ error: "Area non trovata" });
        }
    }
    catch (error) {
        console.error("Errore durante il recupero del sensore:", error);
        res.status(500).send("Errore durante il recupero del sensore");
    }
}));
areaRouter.post("/:id/sensori", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recupero ID area
        const { id } = req.params;
        // Recupero Area
        const areaMod = yield areaSchema_1.default.findOne({ id: id });
        if (!areaMod) {
            res.status(400).json({ error: "Errore nel recupero dell'area" });
        }
        else {
            // Recupero nuovo sensore dalla richiesta
            const { iter, IP, luogo, raggio, area } = req.body;
            const id = yield generateSensId(area);
            const newSens = new sensoreSchema_1.default({
                id,
                area: parseInt(area, 10),
                iter,
                IP,
                luogo,
                raggio,
            });
            // Aggiunta del sensore all'array dell'area
            areaMod.sensori.push(newSens.toObject());
            const savedSensore = areaMod.save();
            res.status(200).json(savedSensore);
        }
    }
    catch (error) {
        console.error("Errore durante il recupero delle aree illuminate dal database:", error);
        res.status(500).send("Errore durante il recupero delle aree illuminate dal database");
    }
}));
function generateSensId(areaId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const area = yield areaSchema_1.default.findOne({ id: areaId }).exec();
            if (!area) {
                throw new Error(`Area con ID ${areaId} non trovata.`);
            }
            const newSensId = area.sensori.length + 1;
            return newSensId;
        }
        catch (error) {
            console.error("Errore durante la generazione dell'ID del sensore:", error);
            throw error;
        }
    });
}
areaRouter.put("/:idA/sensori/edit/:idS", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idA = req.params.idA;
    const idS = req.params.idS;
    parseInt(idA, 10);
    parseInt(idS, 10);
    console.log(`Ricevuta richiesta PUT su /api/aree/${idA}/sensori/${idS}/edit -> ID: ${idS}`);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (area) {
            const sensore = area.sensori.find((sens) => sens.id === parseInt(idS));
            if (sensore) {
                if (req.body.iter !== undefined) {
                    sensore.iter = req.body.iter;
                }
                if (req.body.IP !== undefined) {
                    sensore.IP = req.body.IP;
                }
                if (req.body.luogo !== undefined) {
                    sensore.luogo = req.body.luogo;
                }
                if (req.body.raggio !== undefined) {
                    sensore.raggio = req.body.raggio;
                }
                yield area.save();
                res.status(200).send(`Sensore con id = ${idS} modificato con successo`);
            }
            else {
                res.status(404).send(`Sensore con id = ${idS} non trovato`);
            }
        }
    }
    catch (error) {
        console.error("Errore durante la modifica del sensore:", error);
        res.status(500).send("Errore durante la modifica del sensore");
    }
}));
areaRouter.delete("/:idA/sensori/:idS", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idA, idS } = req.params;
    parseInt(idA, 10);
    parseInt(idS, 10);
    try {
        const area = yield areaSchema_1.default.findOne({ id: idA });
        if (!area) {
            res.status(404).send("Errore nel recupero dell'area illuminata");
            return;
        }
        else {
            area.sensori = area.sensori.filter((sens) => sens.id !== parseInt(idS));
            yield area.save();
            res.status(200).send("Sensore eliminato con successo");
        }
    }
    catch (error) {
        console.error("Errore durante l'eliminazione del sensore:", error);
        res.status(500).send("Errore durante l'eliminazione del sensore");
    }
}));
/*
 * ------------------------------------------------------------------------------------------*
 *                                                                                           *
 *                                           AREE                                            *
 *                                                                                           *
 * ------------------------------------------------------------------------------------------*
 */
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
exports.default = areaRouter;
