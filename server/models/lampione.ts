/*
 *   CLASSE LAMPIONE: classe di base per il lampione, contiene le informazioni necessarie per il funzionamento minimo.
 */
export class Lampione {
  // Attributi
  private id: number;
  private stato: string;
  private lum: number;
  private luogo: string;
  private area: number;
  private isGuasto: boolean;

  // Costruttore
  public constructor(
    id: number = 0,
    stato: string,
    lum: number,
    luogo: string,
    area: number,
  ) {
    this.id = id;
    this.stato = stato;
    this.lum = lum;
    this.luogo = luogo;
    this.area = area;
    this.isGuasto = false;
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

  public getArea() : number{
    return this.area;
  }

  public getGuasto(): boolean {
    return this.isGuasto;
  }

  public setStato(stato: string): void {
    this.stato = stato;
  }
  public setLum(lum: number): void {
    this.lum = lum;
  }
  public setLuogo(luogo: string): void {
    this.luogo = luogo;
  }
  public setArea(area: number): void{
    this.area = area;
  }

  public setGuasto(value: boolean) {
    this.isGuasto = value;
  }

}
