import axios from "axios";

/*
    FUNZIONE TESTREQUEST: funzione per testare le richieste da inoltrare sul server senza avere 2000 file diversi che fanno solo confusione.
    ATTENZIONE: quando dovete testare una nuova richiesta, non cancellate quella sotto, ma usatela come base per crearne una nuova
*/
export default function testRequest(id: number) {
  axios
    .get(`http://localhost:5000/api/lampioni/${id}`)
    .then((response) => {
      // Gestisci la risposta del server
      if (response.status === 200) {
        console.log("Successful");
      }
    })
    .catch((error) => {
      // Gestisci l'errore
      console.error(error);
    });
}
