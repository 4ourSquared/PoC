//INTERFACCIA: serve ad ottenere le info sul tipo di file che stiamo importando
//dalla richiesta GET al server

export {};

interface AreaItem {
    id: number;
    nome: string;
    descrizione: string;
    latitudine: string;
    longitudine: string;
}


export default AreaItem;