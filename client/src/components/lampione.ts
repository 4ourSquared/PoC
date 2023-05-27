export class Lampione {
    // Attributi
    private id      : number;
    private stato   : boolean;
    private lum     : number;
    private luogo   : string;

    // Costruttore
    public constructor(id: number, stato: boolean, lum: number, luogo: string){
        this.id = id;
        this.stato = stato;
        this.lum = lum;
        this.luogo = luogo;
    }

    // Interfaccia
    public getId(): number{
        return this.id;
    }

    public getStato() : boolean{
        return this.stato;
    }

    public getLum() : number{
        return this.lum;
    }
    public getLuogo() : string{
        return this.luogo;
    }
}