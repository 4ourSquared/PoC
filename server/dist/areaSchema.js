"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.pluralize(null);
const areaSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    nome: String,
    descrizione: String,
    latitudine: String,
    longitudine: String,
    lampioni: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "lampioneSchema" }],
    sensori: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "sensoreSchema" }],
});
exports.default = mongoose_1.default.model("aree", areaSchema);
