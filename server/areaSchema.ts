import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import lampioneSchema from "./lampioneSchema";
import sensoreSchema from "./sensoreSchema";

mongoose.pluralize(null);

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
    lampioni: [{ type: Number, ref: "Lampione" }],
    sensori: [{ type: Number, ref: "Sensore" }],
});

export default mongoose.model("aree", areaSchema);