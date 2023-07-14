import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import lampioneSchema from "./lampioneSchema";
import sensoreSchema from "./sensoreSchema";

mongoose.pluralize(null);

const areaSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    nome: String,
    descrizione: String,
    latitudine: String,
    longitudine: String,
    lampioni: [{ type: Schema.Types.ObjectId, ref: "lampioneSchema" }],
    sensori: [{ type: Schema.Types.ObjectId, ref: "sensoreSchema" }],
});

export default mongoose.model("aree", areaSchema);