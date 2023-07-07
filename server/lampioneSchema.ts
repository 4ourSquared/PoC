import mongoose from "mongoose";
mongoose.pluralize(null);

const lampioneSchema = new mongoose.Schema({
    id: Number,
    stato: String,
    lum: Number,
    luogo: String,
});

export default mongoose.model("lampioni", lampioneSchema);
