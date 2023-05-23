export class Lampione {
    // Attributi
    private id      : number;
    private stato   : boolean;
    private lum     : number;

    // Costruttore
    public constructor(id: number, stato: boolean, lum: number){
        this.id = id;
        this.stato = stato;
        this.lum = lum;
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
}