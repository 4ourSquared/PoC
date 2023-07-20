/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative ai lampioni in arrivo al server
*/

import { Router, Request, Response } from "express";
import LampioneSchema from "../schemas/lampioneSchema";

const lampRouter = Router();

lampRouter.get("/", async (req: Request, res: Response) => {
    try {
        const lampioni = await LampioneSchema.find();
        res.status(200).json(lampioni);
    } catch (error) {
        console.error(
            "Errore durante il recupero dei lampioni dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero dei lampioni dal database"
        );
    }
});

lampRouter.get("/guasti", async (req: Request, res: Response) => {
    try {
        const lampioni = await LampioneSchema.find({guasto:true});
        res.status(200).json(lampioni);
    } catch (error) {
        console.error(
            "Errore durante il recupero dei lampioni dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero dei lampioni dal database"
        );
    }
});

lampRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const lampione = await LampioneSchema.findOne({ id: parseInt(id, 10) });
        if (lampione) {
            res.status(200).json(lampione);
        } else {
            res.status(404).json({ error: "Lampione non trovato." });
        }
    } catch (error) {
        console.error(
            "Errore durante il recupero del lampione dal database:",
            error
        );
        res.status(500).send(
            "Errore durante il recupero del lampione dal database"
        );
    }
});

// Creazione di un nuovo lampione
lampRouter.post("/", async (req: Request, res: Response) => {
    const { stato, lum, luogo } = req.body;

    try {
        const id = await generateId();
        const newLampione = new LampioneSchema({
            id,
            stato,
            lum: parseInt(lum, 10),
            luogo,
            guasto:false
        });

        const savedLampione = await newLampione.save();
        res.status(200).json(savedLampione);
    } catch (error) {
        console.error(
            "Errore durante l'inserimento del lampione nel database:",
            error
        );
        res.status(500).send(
            "Errore durante l'inserimento del lampione nel database"
        );
    }
});

async function generateId(): Promise<number> {
    try {
        const maxId = await LampioneSchema.findOne()
            .sort({ id: -1 })
            .select("id")
            .exec();
        return maxId ? maxId.id + 1 : 1;
    } catch (error) {
        console.error("Errore durante il recupero dell'ultimo ID:", error);
        throw new Error("Errore durante la generazione dell'ID incrementale");
    }
}

// Richiesta per aggiornare i dati di un lampione nel sistema
lampRouter.put("/edit/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare

    try {
        const lampToUpdate = await LampioneSchema.findOne({ id: id });

        console.log(
            `Ricevuta richiesta PUT su /api/lampioni/edit -> ID: ${id}`
        );
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

        await lampToUpdate.save();

        res.status(200).send(`Lampione con id = ${id} aggiornato con successo`);
    } catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
});

lampRouter.put("/guasti/add/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare

    try {
        const lampToUpdate = await LampioneSchema.findOne({ id: id });

        console.log(
            `Ricevuta richiesta PUT su /api/lampioni/setguasto -> ID: ${id}`
        );
        console.log("Richiesto toggle per la lista guasti di un lampione esistente");

        if (!lampToUpdate) {
            res.status(404).send(`Lampione con id = ${id} non trovato!`);
            return;
        }

        if(!lampToUpdate.guasto)
            lampToUpdate.guasto = true;
        else {
            res.status(409).send(`Lampione con id = ${id} già presente nella lista guasti!`);
            return;
        }

        await lampToUpdate.save();

        res.status(200).send(`Lampione con id = ${id} trasferito nella lista guasti con successo`);
    } catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
});

lampRouter.put("/guasti/remove/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare

    try {
        const lampToUpdate = await LampioneSchema.findOne({ id: id });

        console.log(
            `Ricevuta richiesta PUT su /api/lampioni/setguasto -> ID: ${id}`
        );
        console.log("Richiesta rimozione da lista guasti di un lampione esistente");

        if (!lampToUpdate) {
            res.status(404).send(`Lampione con id = ${id} non trovato!`);
            return;
        }

        if(lampToUpdate.guasto)
            lampToUpdate.guasto = false;
        else {
            res.status(409).send(`Lampione con id = ${id} non era presente nella lista guasti!`);
            return;
        }

        await lampToUpdate.save();

        res.status(200).send(`Lampione con id = ${id} rimosso dalla lista guasti con successo`);
    } catch (error) {
        console.error("Errore durante l'aggiornamento del lampione:", error);
        res.status(500).send("Errore durante l'aggiornamento del lampione");
    }
});

// Richiesta per eliminare un lampione dal sistema
lampRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const result = await LampioneSchema.deleteOne({ id: id });

        if (result.deletedCount === 0) {
            res.status(404).send(`Lampione con id = ${id} non trovato`);
            return;
        }

        res.status(200).send(`Lampione con id = ${id} eliminato con successo`);
    } catch (error) {
        console.error("Errore durante l'eliminazione del lampione:", error);
        res.status(500).send("Errore durante l'eliminazione del lampione");
    }
});

export default lampRouter;
