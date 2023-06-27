/*
 *   CLASSE AREA: classe di base per l'area illuminata, contiene le informazioni necessarie per il funzionamento minimo.
 */
export class Area {
  // Attributi
  private id: number;
  private nome: string;
  private descrizione: string;
  private latitudine: string;
  private longitudine: string;

  // Costruttore
  public constructor(
    id: number = 0,
    nome: string = "",
    descrizione: string = "",
    latitudine: string = "",
    longitudine: string = ""
  ) {
    this.id = id;
    this.nome = nome;
    this.descrizione = descrizione;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
  }

  // Interfaccia
  public getId(): number {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getDescrizione(): string {
    return this.descrizione;
  }

  public getLatitudine(): string {
    return this.latitudine;
  }

  public getLongitudine(): string {
    return this.longitudine;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setDescrizione(descrizione: string): void {
    this.descrizione = descrizione;
  }

  public setLatitudine(latitudine: string): void {
    this.latitudine = latitudine;
  }

  public setLongitudine(longitudine: string): void {
    this.longitudine = longitudine;
  }
}
