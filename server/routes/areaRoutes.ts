/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative alle aree illuminate in arrivo al server
*/

import { Router, Request, Response } from "express";
import AreaSchema from "../areaSchema";
import { Area } from "../models/area";
import lampioneSchema from "../lampioneSchema";
import { Lampione } from "../models/lampione";
import areaSchema from "../areaSchema";

const areaRouter = Router();

areaRouter.get("/:idA/lampioni/:idL", async (req: Request, res: Response) => {
    console.log("Ricevuta richiesta per info lampione specifico");

    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);
    console.log(idA, idL);

    try {
        const area = await AreaSchema.findOne({ id: idA });
        if (area) {
            console.log("Area trovata: ", idA);
            const lampione = area.lampioni.find(
                (lamp: any) => lamp.id === parseInt(idL)
            );
            if (lampione) {
                console.log("Lampione trovato: ", idL);
                res.status(200).json(lampione);
            } else {
                res.status(404).json({ error: "Lampione non trovato" });
            }
        } else {
            res.status(404).json({ error: "Area non trovata" });
        }
    } catch (error) {
        console.error("Errore durante il recupero del lampione:", error);
        res.status(500).send("Errore durante il recupero del lampione");
    }
});


areaRouter.get("/", async (req: Request, res: Response) => {
    try {
        const aree = await AreaSchema.find();
        res.status(200).json(aree);
    } catch (error) {
        console.error(
            "Errore durante il recupero delle aree illuminate dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero delle aree illuminate dal database"
        );
    }
});

areaRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const area = await AreaSchema.findOne({ id: parseInt(id, 10) });
        if (area) {
            res.status(200).json(area);
        } else {
            res.status(404).json({ error: "Area illuminata non trovato." });
        }
    } catch (error) {
        console.error(
            "Errore durante il recupero dell'area illuminata dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero dell'area illuminata dal database"
        );
    }
});

areaRouter.get("/:id/lampioni", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const area = await AreaSchema.findOne({ id: parseInt(id, 10) });
        if (area) {
            console.log("Area trovata");
            res.status(200).json(area.lampioni);
        } else {
            res.status(404).json({ error: "Area non trovata." });
        }
    } catch (error) {
        console.error(
            "Errore durante il recupero dei lampioni dall'area dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero dei lampioni dall'area dal database"
        );
    }
});

areaRouter.get("/:id/sensori", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const area = await AreaSchema.findOne({ id: parseInt(id, 10) });
        if (area) {
            res.status(200).json(area.sensori);
        } else {
            res.status(404).json({ error: "Area non trovata." });
        }
    } catch (error) {
        console.error(
            "Errore durante il recupero dei sensori dall'area dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero dei sensori dall'area dal database"
        );
    }
});

areaRouter.post("/", async (req: Request, res: Response) => {
    const { nome, descrizione, latitudine, longitudine, sensori, lampioni } =
        req.body;
    const id: number = await generateIdAree();
    const newArea = new AreaSchema({
        id,
        nome,
        descrizione,
        latitudine,
        longitudine,
        sensori,
        lampioni,
    });

    try {
        const savedArea = await newArea.save();
        res.status(200).json(savedArea);
    } catch (error) {
        console.error(
            "Errore durante l'inserimento dell'area illuminata nel database:",
            error
        );
        res.status(500).send(
            "Errore durante l'inserimento dell'area illuminata nel database"
        );
    }
});

async function generateIdAree(): Promise<number> {
    try {
        const maxId = await AreaSchema.findOne()
            .sort({ id: -1 })
            .select("id")
            .exec();
        return maxId ? maxId.id + 1 : 1;
    } catch (error) {
        console.error("Errore durante il recupero dell'ultimo ID:", error);
        throw new Error("Errore durante la generazione dell'ID incrementale");
    }
}

areaRouter.put("/edit/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const areaToUpdate = await AreaSchema.findOne({ id });

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

        await areaToUpdate.save();

        res.status(200).send(
            `Area illuminata con id = ${id} aggiornato con successo`
        );
    } catch (error) {
        console.error(
            "Errore durante l'aggiornamento dell'area illuminata:",
            error
        );
        res.status(500).send(
            "Errore durante l'aggiornamento dell'area illuminata"
        );
    }
});

areaRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await AreaSchema.deleteOne({ id });

        if (result.deletedCount === 0) {
            res.status(404).send(`Area illuminata con id = ${id} non trovato`);
            return;
        }

        res.status(200).send(
            `Area illuminata con id = ${id} eliminato con successo`
        );
    } catch (error) {
        console.error(
            "Errore durante l'eliminazione dell'area illuminata:",
            error
        );
        res.status(500).send(
            "Errore durante l'eliminazione dell'area illuminata"
        );
    }
});

areaRouter.post("/:id/lampioni", async (req: Request, res: Response) => {
    try {
        // Recupero ID area
        const { id } = req.params;

        // Recupero Area
        const areaMod = await AreaSchema.findOne({ id: id });

        if (!areaMod) {
            res.status(400).json({ error: "Errore nel recupero dell'area" });
        } else {
            // Recupero nuovo lampione dalla richiesta
            const { stato, lum, luogo, area } = req.body;
            const id = await generateLampId(area);
            const newLamp = new lampioneSchema({
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
    } catch (error) {
        console.error(
            "Errore durante il recupero delle aree illuminate dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero delle aree illuminate dal database"
        );
    }
});


async function generateLampId(areaId: number): Promise<number> {
    try {
        const area = await areaSchema.findOne({ id: areaId }).exec();

        if (!area) {
            throw new Error(`Area con ID ${areaId} non trovata.`);
        }

        const newLampId = area.lampioni.length + 1;

        return newLampId;
    } catch (error) {
        console.error(
            "Errore durante la generazione dell'ID del lampione:",
            error
        );
        throw error;
    }
}

export default areaRouter;
