import mongoose from "mongoose";
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
    //includere lampioni o sensori
});

export default mongoose.model("aree", areaSchema);