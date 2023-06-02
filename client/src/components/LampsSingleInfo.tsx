import { Component } from "react";

/*
    FUNZIONE LAMPSINGLEINFO
    PRE: id è un numero e si riferisce all'identificativo univoco di un lampione
    POST: la funzione ritorna la struttura HTML per la visualizzazione delle informazioni di interesse di un singolo lampione
*/
export function LampsSingleInfo(id:number){
    // Invio della richiesta dati
    const xhttp = new XMLHttpRequest();

    // Creazione della connessione per la richiesta dei dati
    xhttp.open("GET", `http://localhost:5000/api/lampioni/${id}`, false);
    xhttp.send();

    // Parsing dei dati
    const lampioni = JSON.parse(xhttp.responseText);

    return(
        <>
        </>
    );
} 
