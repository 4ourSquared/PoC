import mongoose, { Schema, Document } from "mongoose";
mongoose.pluralize(null);

const sensoreSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    iter: { type: String, default: "manuale" },
    IP: String,
    luogo: String,
    raggio: Number,
});

export default mongoose.model("sensori", sensoreSchema);
