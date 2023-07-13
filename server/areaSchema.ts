import mongoose from "mongoose";
mongoose.pluralize(null);

import lampioneSchema from "./lampioneSchema";
import sensoreSchema from "./sensoreSchema";


const areaSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    nome: String,
    descrizione: String,
    latitudine: String,
    longitudine: String,
    lampioni: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "lampioni"
    }], // Array di riferimenti ai documenti dei "lampioni"
    sensori: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sensori"
    }] // Array di riferimenti ai documenti dei "sensori"
});

export default mongoose.model("aree", areaSchema);