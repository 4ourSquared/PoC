import { Router, Request, Response } from "express";
import { Lampione } from "../models/lampione";
import LampioneModel from "../lampioneSchema";


const lampRouter = Router();

// Array di test per i lampioni
let lampioni_test: Lampione[] = [];

lampRouter.get("/", async (req: Request, res: Response) => {
    try {
        const lampioni = await LampioneModel.find();
        res.status(200).json(lampioni);
    } catch (error) {
        console.error("Errore durante il recupero dei lampioni dal database:", error);
        res.status(500).send("Errore durante il recupero dei lampioni dal database");
    }
});

lampRouter.get("/:id", async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const lampione = await LampioneModel.findOne({ id: parseInt(id, 10) });
        if (lampione) {
            res.status(200).json(lampione);
        } else {
            res.status(404).json({ error: "Lampione non trovato." });
        }
    } catch (error) {
        console.error("Errore durante il recupero del lampione dal database:", error);
        res.status(500).send("Errore durante il recupero del lampione dal database");
    }
});

// Creazione di un nuovo lampione
lampRouter.post("/", async (req: Request, res: Response) => {
    const { stato, lum, luogo } = req.body;
    const id = await generateId();
    const new_lamp = new LampioneModel({
        id,
        stato,
        lum: parseInt(lum, 10),
        luogo,
    });

    try {
        const savedLamp = await new_lamp.save();
        res.status(200).json(savedLamp);
    } catch (error) {
        console.error("Errore durante l'inserimento del lampione nel database:", error);
        res.status(500).send("Errore durante l'inserimento del lampione nel database");
    }
});

async function generateId(): Promise<number> {
    try {
        const count = await LampioneModel.countDocuments().exec();
        return count + 1;
    } catch (error) {
        console.error("Errore durante il recupero del conteggio dei documenti:", error);
        throw new Error("Errore durante la generazione dell'ID incrementale");
    }
}


export default lampRouter;
