import { Component } from "react";
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
