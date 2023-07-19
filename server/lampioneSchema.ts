import mongoose, { Schema } from "mongoose";
mongoose.pluralize(null);

export interface ILampioneSchema extends Document{
    id: number;
    stato: string;
    lum: number;
    luogo: string;
    area: number;
}

const lampioneSchema : Schema= new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    stato: String,
    lum: Number,
    luogo: String,
    area: {
        type: Number,
        required: true,
    }
});

export default mongoose.model("lampioni", lampioneSchema);

