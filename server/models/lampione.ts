/*
 *   CLASSE LAMPIONE: classe di base per il lampione, contiene le informazioni necessarie per il funzionamento minimo.
 */
import mongoose, { Schema, Document } from 'mongoose';

// Interfaccia per il modello del Lampione
export interface ILampione extends Document {
  id: number;
  stato: string;
  lum: number;
  luogo: string;
}

// Schema del Lampione
const LampioneSchema: Schema = new Schema({
  id: { type: Number, required: true },
  stato: { type: String, required: true },
  lum: { type: Number, required: true },
  luogo: { type: String, required: true }
});

// Modello del Lampione
const Lampione = mongoose.model<ILampione>('lampioni', LampioneSchema);

export default Lampione;
