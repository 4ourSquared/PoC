//INTERFACCIA: serve ad ottenere le info sul tipo di file che stiamo importando
//dalla richiesta GET al server

export {};

interface LampItem {
  id: number;
  stato: string;
  lum: number;
  luogo: string;
}

export default LampItem;
