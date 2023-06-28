/*
 *   CLASSE SENSORE: classe di base per il sensore, contiene le informazioni necessarie per il funzionamento minimo.
 */
export interface Sensore {
  // Attributi
  id: number;
  iter: string; //tipo di iterazione manuale(pull) o automatica(push) - di default sarà manuale
  IP: string;
  luogo: string;
  raggio: number;
  }