import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import lampioneSchema, { ILampioneSchema } from "./lampioneSchema";
import sensoreSchema from "./sensoreSchema";

mongoose.pluralize(null);

export interface IAreaSchema extends Document {
    id: number;
    nome: string;
    descrizione: string;
    latitudine: string;
    longitudine: string;
    lampioni: ILampioneSchema[];
    sensori: number;
}

const areaSchema : Schema<IAreaSchema> = new mongoose.Schema<IAreaSchema>({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    nome: String,
    descrizione: String,
    latitudine: String,
    longitudine: String,
    lampioni: [{ type: lampioneSchema.schema }],
    sensori: [{ type: sensoreSchema.schema }],
});

export default mongoose.model<IAreaSchema>("aree", areaSchema);
