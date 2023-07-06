import mongoose, { Schema, Document } from "mongoose";
mongoose.pluralize(null);

const sensoreSchema = new mongoose.Schema({
    id: Number,
    iter: {type: String, default:"manuale"},
    IP: String,
    luogo: String,
    raggio: Number
});

export default mongoose.model("sensori", sensoreSchema);