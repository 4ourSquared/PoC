import mongoose, { Schema, Document } from "mongoose";
mongoose.pluralize(null);

const sensoreSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    iter: { type: String, default: "manuale" },
    IP: String,
    luogo: String,
    raggio: Number,
    area: {
        type: Number,
        required: true,
    }
});

export default mongoose.model("sensori", sensoreSchema);
