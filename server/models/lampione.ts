/*
 *   CLASSE LAMPIONE: classe di base per il lampione, contiene le informazioni necessarie per il funzionamento minimo.
 */
export class Lampione {
  // Attributi
  private id: number;
  private stato: string;
  private lum: number;
  private luogo: string;

  // Costruttore
  public constructor(
    id: number = 0,
    stato: string,
    lum: number,
    luogo: string
  ) {
    this.id = id;
    this.stato = stato;
    this.lum = lum;
    this.luogo = luogo;
  }

  // Interfaccia
  public getId(): number {
    return this.id;
  }
  public getStato(): string {
    return this.stato;
  }
  public getLum(): number {
    return this.lum;
  }
  public getLuogo(): string {
    return this.luogo;
  }
}