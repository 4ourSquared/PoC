//INTERFACCIA: serve ad ottenere le info sul tipo di file che stiamo importando
//dalla richiesta GET al server
import SensoreItem from './SensItem';
import LampioneItem from './LampItem';

interface AreaItem {
    id: number;
    nome: string;
    descrizione: string;
    latitudine: string;
    longitudine: string;
    sensori: SensoreItem[];
    lampioni: LampioneItem[];
}

export default AreaItem;