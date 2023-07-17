/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative ai sensori in arrivo al server
*/

import { Router, Request, Response } from "express";
import SensoreSchema from "../sensoreSchema";
import { Sensore } from "../models/sensore";
import areaSchema from "../areaSchema";

const sensRouter = Router();

sensRouter.get("/", async (req: Request, res: Response) => {
    try {
        const sensori = await SensoreSchema.find();
        res.status(200).json(sensori);
    } catch (error) {
        console.error(
            "Errore durante il recupero dei sensori dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero dei sensori dal database"
        );
    }
});

sensRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const sensore = await SensoreSchema.findOne({ id: parseInt(id, 10) });
        if (sensore) {
            res.status(200).json(sensore);
        } else {
            res.status(404).json({ error: "Sensore non trovato." });
        }
    } catch (error) {
        console.error(
            "Errore durante il recupero del sensore dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero del sensore dal database"
        );
    }
});

sensRouter.post("/", async (req: Request, res: Response) => {
    const { iter, IP, luogo, raggio, area } = req.body;
    const id: number = await generateIdSensori();
    const newSensore = new SensoreSchema({
        id,
        iter,
        IP,
        luogo,
        raggio: parseInt(raggio, 10),
        area: parseInt(area, 10),
    });

    try {

        try{
            const designedArea = await areaSchema.findOne({id: parseInt(area, 10)});
            if(!designedArea){
                res.status(404).json({error: "Area illuminata per l'inserimento del sensore non trovata"});
            }
            else{
                console.log("Area Trovata!");
                designedArea.sensori.push(newSensore.id)
                designedArea.save();
                console.log(designedArea);
            }
        }
        catch (error){
            console.error(
                "Errore durante il recupero dell'area illuminata dal database:",
                error
            );
            res.status(500).send(
                "Errore durante il recupero dell'area illuminata dal database"
            );
        }
        const savedSensore = await newSensore.save();
        res.status(200).json(savedSensore);
    } catch (error) {
        console.error(
            "Errore durante l'inserimento del sensore nel database:",
            error
        );
        res.status(500).send(
            "Errore durante l'inserimento del sensore nel database"
        );
    }
});

async function generateIdSensori(): Promise<number> {
    try {
        const maxId = await SensoreSchema
            .findOne()
            .sort({ id: -1 })
            .select("id")
            .exec();
        return maxId ? maxId.id + 1 : 1;
    } catch (error) {
        console.error("Errore durante il recupero dell'ultimo ID:", error);
        throw new Error("Errore durante la generazione dell'ID incrementale");
    }
}

sensRouter.put("/edit/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const sensoreToUpdate = await SensoreSchema.findOne({ id });

        console.log(`Ricevuta richiesta PUT su /api/sensori/edit -> ID: ${id}`);
        console.log("Richiesta aggiornamento di un sensore esistente");

        if (!sensoreToUpdate) {
            res.status(404).send(`Sensore con id = ${id} non trovato`);
            return;
        }

        if (req.body.iter !== undefined) {
            sensoreToUpdate.iter = req.body.iter;
        }
        if (req.body.IP !== undefined) {
            sensoreToUpdate.IP = req.body.IP;
        }
        if (req.body.luogo !== undefined) {
            sensoreToUpdate.luogo = req.body.luogo;
        }
        if (req.body.raggio !== undefined) {
            sensoreToUpdate.raggio = parseInt(req.body.raggio, 10);
        }

        await sensoreToUpdate.save();

        res.status(200).send(`Sensore con id = ${id} aggiornato con successo`);
    } catch (error) {
        console.error("Errore durante l'aggiornamento del sensore:", error);
        res.status(500).send("Errore durante l'aggiornamento del sensore");
    }
});

sensRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await SensoreSchema.deleteOne({ id });

        if (result.deletedCount === 0) {
            res.status(404).send(`Sensore con id = ${id} non trovato`);
            return;
        }

        res.status(200).send(`Sensore con id = ${id} eliminato con successo`);
    } catch (error) {
        console.error("Errore durante l'eliminazione del sensore:", error);
        res.status(500).send("Errore durante l'eliminazione del sensore");
    }
});

export default sensRouter;
