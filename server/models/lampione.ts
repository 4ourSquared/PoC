/*
 *   CLASSE LAMPIONE: classe di base per il lampione, contiene le informazioni necessarie per il funzionamento minimo.
 */
export interface Lampione {
  // Attributi
  id: number;
  stato: string;
  lum: number;
  luogo: string;
}
