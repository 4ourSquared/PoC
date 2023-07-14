"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.pluralize(null);
const sensoreSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    iter: { type: String, default: "manuale" },
    IP: String,
    luogo: String,
    raggio: Number,
    area: Number,
});
exports.default = mongoose_1.default.model("sensori", sensoreSchema);
