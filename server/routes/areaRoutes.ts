/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative alle aree illuminate in arrivo al server
*/

import { Router, Request, Response } from "express";
import AreaSchema, { IAreaSchema } from "../areaSchema";
import lampioneSchema, { ILampioneSchema } from "../lampioneSchema";
import sensoreSchema, { ISensoreSchema } from "../sensoreSchema";

const areaRouter = Router();

/*
 * ------------------------------------------------------------------------------------------*
 *                                                                                           *
 *                                      LAMPIONI                                             *
 *                                                                                           *
 * ------------------------------------------------------------------------------------------*
 */

areaRouter.put(
    "/:idA/lampioni/guasti/:idL",
    async (req: Request, res: Response) => {
        const idA = req.params.idA;
        const idL = req.params.idL;

        parseInt(idA, 10);
        parseInt(idL, 10);

        try {
            const area = await AreaSchema.findOne({ id: idA });

            if (area) {
                const lampione = area.lampioni.find(
                    (lamp: ILampioneSchema) => lamp.id === parseInt(idL)
                );

                if (lampione) {
                    if (!lampione.guasto) {
                        lampione.guasto = true;
                    } else {
                        res.status(409).send(
                            `Lampione con id = ${idL} già presente nella lista guasti!`
                        );
                        return;
                    }
                    await area.save();
                    res.status(200).send(
                        `Lampione con id = ${idL} segnalato come guasto`
                    );
                    return;
                } else {
                    res.status(404).send(
                        `Lampione con id = ${idL} non trovato`
                    );
                }
            }
        } catch (error) {
            console.error(
                "Errore durante l'aggiornamento del lampione:",
                error
            );
            res.status(500).send("Errore durante l'aggiornamento del lampione");
        }
    }
);

areaRouter.put(
    "/:idA/lampioni/guasti/remove/:idL",
    async (req: Request, res: Response) => {
        const idA = req.params.idA;
        const idL = req.params.idL;

        parseInt(idA, 10);
        parseInt(idL, 10);

        try {
            const area = await AreaSchema.findOne({ id: idA });

            if (area) {
                const lampione = area.lampioni.find(
                    (lamp: ILampioneSchema) => lamp.id === parseInt(idL)
                );

                if (lampione) {
                    if (lampione.guasto) {
                        lampione.guasto = false;
                    } else {
                        res.status(409).send(
                            `Lampione con id = ${idL} non era presente nella lista guasti!`
                        );
                        return;
                    }
                    await area.save();
                }
            }
        } catch (error) {
            console.error(
                "Errore durante l'aggiornamento del lampione:",
                error
            );
            res.status(500).send("Errore durante l'aggiornamento del lampione");
        }
    }
);

areaRouter.get(
    "/:idA/lampioni/guasti/",
    async (req: Request, res: Response) => {
        const idA = req.params.idA;
        parseInt(idA, 10);

        try {
            const area = await AreaSchema.findOne({ id: idA });

            if (area) {
                const lampioni: ILampioneSchema[] = area.lampioni.filter(
                    (lamp: ILampioneSchema) => lamp.guasto === true
                );

                if (lampioni) {
                    res.status(200).json(lampioni);
                } else {
                    res.status(404).json({ error: "Nessun lampione trovato" });
                }
            }
            else{
                res.status(404).json({error: "Area non trovata"});
            }
        } catch (error) {
            console.error(
                "Errore durante il recupero dei lampioni guasti",
                error
            );
            res.status(500).send(
                "Errore durante il recupero dei lampioni guasti"
            );
        }
    }
);

// RICHIESTA INFORMAZIONI SINGOLO LAMPIONE
areaRouter.get("/:idA/lampioni/:idL", async (req: Request, res: Response) => {
    const idA = req.params.idA;
    const idL = req.params.idL;
    parseInt(idA, 10);
    parseInt(idL, 10);

    try {
        const area = await AreaSchema.findOne({ id: idA });
        if (area) {
            const lampione = area.lampioni.find(
                (lamp: ILampioneSchema) => lamp.id === parseInt(idL)
            );
            if (lampione) {
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

// RICHIESTA INFORMAZIONI DI TUTTI I LAMPIONI DELL'AREA
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

// RICHIESTA AGGIUNTA LAMPIONE
areaRouter.post("/:id/lampioni", async (req: Request, res: Response) => {
    try {
        // Recupero ID area
        const { id } = req.params;
        parseInt(id, 10);

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
                guasto: false,
            });

            // Aggiunta del lampione all'array dell'area
            areaMod.lampioni.push(newLamp.toObject());
            const savedLampione = areaMod.save();
            res.status(200).json(savedLampione);
        }
    } catch (error) {
        console.error(
            "Errore durante il recupero delle aree illuminate dal database (aggiunta lampione):",
            error
        );
        res.status(500).send(
            "Errore durante il recupero delle aree illuminate dal database (aggiunta lampione)"
        );
    }
});

// RICHIESTA MODIFICA LAMPIONE
areaRouter.put(
    "/:idA/lampioni/edit/:idL",
    async (req: Request, res: Response) => {
        const idA = req.params.idA;
        const idL = req.params.idL;
        parseInt(idA, 10);
        parseInt(idL, 10);
        console.log(
            `Ricevuta richiesta PUT su /api/aree/${idA}/lampioni/${idL}/edit -> ID: ${idL}`
        );

        try {
            const area = await AreaSchema.findOne({ id: idA });
            if (area) {
                const lampione = area.lampioni.find(
                    (lamp: ILampioneSchema) => lamp.id === parseInt(idL)
                );
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
                    await area.save();
                    res.status(200).send(
                        `Lampione con id = ${idL} modificato con successo`
                    );
                } else {
                    res.status(404).send(
                        `Lampione con id = ${idL} non trovato`
                    );
                }
            }
        } catch (error) {
            console.error("Errore durante la modifica del lampione:", error);
            res.status(500).send("Errore durante la modifica del lampione");
        }
    }
);

// RICHIESTA ELIMINAZIONE LAMPIONE
areaRouter.delete(
    "/:idA/lampioni/:idL",
    async (req: Request, res: Response) => {
        const { idA, idL } = req.params;
        parseInt(idA, 10);
        parseInt(idL, 10);

        try {
            const area = await AreaSchema.findOne({ id: idA });

            if (!area) {
                res.status(404).send(
                    "Errore nel recupero dell'area illuminata"
                );
                return;
            } else {
                area.lampioni = area.lampioni.filter(
                    (lamp: ILampioneSchema) => lamp.id !== parseInt(idL)
                );
                await area.save();

                res.status(200).send("Lampione eliminato con successo");
            }
        } catch (error) {
            console.error("Errore durante l'eliminazione del lampione:", error);
            res.status(500).send("Errore durante l'eliminazione del lampione");
        }
    }
);

// GENERAZIONE ID INCREMENTALE PER LAMPIONI
async function generateLampId(areaId: number): Promise<number> {
    try {
        const area = await AreaSchema.findOne({ id: areaId }).exec();

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

/*
 * ------------------------------------------------------------------------------------------*
 *                                                                                           *
 *                                       SENSORI                                             *
 *                                                                                           *
 * ------------------------------------------------------------------------------------------*
 */
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

areaRouter.get("/:idA/sensori/:idS", async (req: Request, res: Response) => {
    const idA = req.params.idA;
    const idS = req.params.idS;
    parseInt(idA, 10);
    parseInt(idS, 10);

    try {
        const area = await AreaSchema.findOne({ id: idA });
        if (area) {
            const sensore = area.sensori.find(
                (sens: any) => sens.id === parseInt(idS)
            );
            if (sensore) {
                res.status(200).json(sensore);
            } else {
                res.status(404).json({ error: "Sensore non trovato" });
            }
        } else {
            res.status(404).json({ error: "Area non trovata" });
        }
    } catch (error) {
        console.error("Errore durante il recupero del sensore:", error);
        res.status(500).send("Errore durante il recupero del sensore");
    }
});

areaRouter.post("/:id/sensori", async (req: Request, res: Response) => {
    try {
        // Recupero ID area
        const { id } = req.params;

        // Recupero Area
        const areaMod = await AreaSchema.findOne({ id: id });

        if (!areaMod) {
            res.status(400).json({ error: "Errore nel recupero dell'area" });
        } else {
            // Recupero nuovo sensore dalla richiesta
            const { iter, IP, luogo, raggio, area } = req.body;
            const id = await generateSensId(area);
            const newSens = new sensoreSchema({
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

async function generateSensId(areaId: number): Promise<number> {
    try {
        const area = await AreaSchema.findOne({ id: areaId }).exec();

        if (!area) {
            throw new Error(`Area con ID ${areaId} non trovata.`);
        }

        const newSensId = area.sensori.length + 1;

        return newSensId;
    } catch (error) {
        console.error(
            "Errore durante la generazione dell'ID del sensore:",
            error
        );
        throw error;
    }
}

areaRouter.put(
    "/:idA/sensori/edit/:idS",
    async (req: Request, res: Response) => {
        const idA = req.params.idA;
        const idS = req.params.idS;

        parseInt(idA, 10);
        parseInt(idS, 10);
        console.log(
            `Ricevuta richiesta PUT su /api/aree/${idA}/sensori/${idS}/edit -> ID: ${idS}`
        );

        try {
            const area = await AreaSchema.findOne({ id: idA });
            if (area) {
                const sensore = area.sensori.find(
                    (sens: ISensoreSchema) => sens.id === parseInt(idS)
                );
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
                    await area.save();
                    res.status(200).send(
                        `Sensore con id = ${idS} modificato con successo`
                    );
                } else {
                    res.status(404).send(`Sensore con id = ${idS} non trovato`);
                }
            }
        } catch (error) {
            console.error("Errore durante la modifica del sensore:", error);
            res.status(500).send("Errore durante la modifica del sensore");
        }
    }
);

areaRouter.delete("/:idA/sensori/:idS", async (req: Request, res: Response) => {
    const { idA, idS } = req.params;
    parseInt(idA, 10);
    parseInt(idS, 10);

    try {
        const area = await AreaSchema.findOne({ id: idA });

        if (!area) {
            res.status(404).send("Errore nel recupero dell'area illuminata");
            return;
        } else {
            area.sensori = area.sensori.filter(
                (sens: ISensoreSchema) => sens.id !== parseInt(idS)
            );
            await area.save();

            res.status(200).send("Sensore eliminato con successo");
        }
    } catch (error) {
        console.error("Errore durante l'eliminazione del sensore:", error);
        res.status(500).send("Errore durante l'eliminazione del sensore");
    }
});

/*
 * ------------------------------------------------------------------------------------------*
 *                                                                                           *
 *                                           AREE                                            *
 *                                                                                           *
 * ------------------------------------------------------------------------------------------*
 */
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

export default areaRouter;
