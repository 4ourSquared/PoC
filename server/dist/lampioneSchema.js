"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.pluralize(null);
const lampioneSchema = new mongoose_1.default.Schema({
    id: Number,
    stato: String,
    lum: Number,
    luogo: String,
});
exports.default = mongoose_1.default.model("lampioni", lampioneSchema);
