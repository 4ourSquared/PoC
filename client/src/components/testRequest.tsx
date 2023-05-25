import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function testRequest(){
    axios.get('http://localhost:5000/api/lampioni')
        .then(response => {
    // Gestisci la risposta del server
    console.log("Ricevuta Risposta da localhost:5000")
    })
    .catch(error => {
    // Gestisci l'errore
    console.error(error);
    });
}