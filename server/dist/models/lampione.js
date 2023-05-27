"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lampione = void 0;
class Lampione {
    // Costruttore
    constructor(id = 0, stato, lum, luogo) {
        this.id = id;
        this.stato = stato;
        this.lum = lum;
        this.luogo = luogo;
    }
    // Interfaccia
    getId() {
        return this.id;
    }
    getStato() {
        return this.stato;
    }
    getLum() {
        return this.lum;
    }
    getLuogo() {
        return this.luogo;
    }
}
exports.Lampione = Lampione;
