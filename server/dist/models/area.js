"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = void 0;
/*
 *   CLASSE AREA: classe di base per l'area illuminata, contiene le informazioni necessarie per il funzionamento minimo.
 */
class Area {
    // Costruttore
    constructor(id = 0, nome = "", descrizione = "", latitudine = "", longitudine = "", sensori = [], lampioni = []) {
        this.id = id;
        this.nome = nome;
        this.descrizione = descrizione;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
        this.sensori = sensori; // Aggiunto
        this.lampioni = lampioni; // Aggiunto
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
    getSensori() { // Aggiunto
        return this.sensori;
    }

    getLampioni() { // Aggiunto
        return this.lampioni;
    }

    setSensori(sensori) { // Aggiunto
        this.sensori = sensori;
    }

    setLampioni(lampioni) { // Aggiunto
        this.lampioni = lampioni;
    }
}
exports.Area = Area;
