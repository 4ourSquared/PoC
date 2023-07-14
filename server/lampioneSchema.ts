import mongoose from "mongoose";
mongoose.pluralize(null);

const lampioneSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    stato: String,
    lum: Number,
    luogo: String,
    area: Number,
});

export default mongoose.model("lampioni", lampioneSchema);
