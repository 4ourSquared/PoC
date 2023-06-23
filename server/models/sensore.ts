/*
 *   CLASSE SENSORE: classe di base per il sensore, contiene le informazioni necessarie per il funzionamento minimo.
 */
export class Sensore {
    // Attributi
    private id: number;
    private iter: string; //tipo di iterazione manuale(pull) o automatica(push) - di default sarà manuale
    private IP: string;
    private luogo: string;
    private raggio: number;
  
    // Costruttore
    public constructor(
      id: number = 0,
      iter: string = "manuale",
      IP: string,
      luogo: string,
      raggio: number
    ) {
      this.id = id;
      this.iter = iter;
      this.IP = IP;
      this.luogo = luogo;
      this.raggio = raggio;
    }
  
    // Interfaccia
    public getId(): number {
      return this.id;
    }
    public getIter(): string {
        return this.iter;
      }
    public getIP(): string {
      return this.IP;
    }
    public getLuogo(): string {
      return this.luogo;
    }
    public getRaggio(): number {
        return this.raggio;
    }
    public setIter(iter: string): void {
        this.iter = iter;
    }
    public setIP(IP: string): void {
        this.IP = IP;
    }
    public setLuogo(luogo: string): void {
        this.luogo = luogo;
    }
    public setRaggio(raggio: number): void {
        this.raggio = raggio;
    }
  }