import mongoose from "mongoose";
mongoose.pluralize(null);

const lampioneSchema = new mongoose.Schema({
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
