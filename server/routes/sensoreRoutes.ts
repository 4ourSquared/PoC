import { Router, Request, Response } from "express";
import { Sensore } from "../models/sensore";
import SensoreSchema from "../sensoreSchema";

const sensRouter = Router();

// Richiesta per eliminare un lampione dal sistema
app.delete("/api/lampioni/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const lampToDelete = lampioni_test.find((lamp) => lamp.getId() === id); //Individua il lampione con id richiesto
    if (lampToDelete === undefined) {
      res.status(404).send(`Lampione con id = ${id} non trovato`);
    } else {
      const idx = lampioni_test.indexOf(lampToDelete);
      lampioni_test.splice(idx, 1); //Elimina gli elementi tra idx e il numero indicato, in questo caso 1 solo elemento
      res.status(200).send(`Lampione con id = ${id} eliminato con successo`);
    }
  });
  
  // Richiesta per aggiornare i dati di un lampione nel sistema
  // Aggiunto /edit/:id per evitare conflitti con la richiesta di info di un
  // singolo lampione
  app.put("/api/lampioni/edit/:id", (req, res) => {
    const id = parseInt(req.params.id); // ID del lampione da aggiornare
    const lampToUpdate = lampioni_test.find((lamp) => lamp.getId() === id);
    console.log(`Ricevuta richiesta PUT su /api/lampioni -> ID: ${id}`);
    console.log("Richiesta aggiornamento di un lampione esistente");
  
    if (lampToUpdate === undefined) {
      res.status(404).send(`Lampione con id = ${id} non trovato`);
    } else {
      if (req.body.stato !== undefined) {
        lampToUpdate.setStato(req.body.stato);
      }
      if (req.body.lum !== undefined) {
        lampToUpdate.setLum(parseInt(req.body.lum, 10));
      }
      if (req.body.luogo !== undefined) {
        lampToUpdate.setLuogo(req.body.luogo);
      }
  
    }
    res.status(200).send(`Lampione con id = ${id} aggiornato con successo`);
  });