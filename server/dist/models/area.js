"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = void 0;
/*
 *   CLASSE AREA: classe di base per l'area illuminata, contiene le informazioni necessarie per il funzionamento minimo.
 */
class Area {
    // Costruttore
    constructor(id = 0, nome = "", descrizione = "", latitudine = "", longitudine = "") {
        this.id = id;
        this.nome = nome;
        this.descrizione = descrizione;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
    }
    // Interfaccia
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getDescrizione() {
        return this.descrizione;
    }
    getLatitudine() {
        return this.latitudine;
    }
    getLongitudine() {
        return this.longitudine;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setDescrizione(descrizione) {
        this.descrizione = descrizione;
    }
    setLatitudine(latitudine) {
        this.latitudine = latitudine;
    }
    setLongitudine(longitudine) {
        this.longitudine = longitudine;
    }
}
exports.Area = Area;
