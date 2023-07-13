"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.pluralize(null);
const areaSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    nome: String,
    descrizione: String,
    latitudine: String,
    longitudine: String,
    lampioni: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "lampioni"
        }],
    sensori: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "sensori"
        }] // Array di riferimenti ai documenti dei "sensori"
});
exports.default = mongoose_1.default.model("aree", areaSchema);
