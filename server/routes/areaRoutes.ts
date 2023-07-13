/*
    Lo scopo di questo script è quello di gestire le routes per le richieste relative alle aree illuminate in arrivo al server
*/

import { Router, Request, Response } from "express";
import AreaSchema from "../areaSchema";
import { Area } from "../models/area";

const areaRouter = Router();

//includere funzioni delle aree create da Lorenzo

export default areaRouter;