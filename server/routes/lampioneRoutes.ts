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

// Richiesta di informazioni per un determinato lampione
lampRouter.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    console.log(`Ricevuta richiesta GET su /api/lampioni -> ID: ${id}`);

  // Trova il lampione con l'ID specificato
    const lampione = lampioni_test.find((lamp) => lamp.getId() === id);

    if (lampione) {
        res.status(200).json(lampione);
    } else {
        res.status(404).json({ error: "Lampione non trovato." });
    }
});

// Creazione di un nuovo lampione
lampRouter.post("/", async (req: Request, res: Response) => {
    const { stato, lum, luogo } = req.body;
    const id = generateId();
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

// Funzione per generare un ID incrementale per il lampione
function generateId(): number {
    const maxId =
        lampioni_test.length > 0
        ? Math.max(...lampioni_test.map((lamp) => lamp.getId()))
        : 0;
    return maxId + 1;
}

export default lampRouter;
