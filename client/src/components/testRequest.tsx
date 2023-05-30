import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function testRequest(id:number){
    axios.get(`http://localhost:5000/api/lampioni/${id}`)
        .then(response => {
    // Gestisci la risposta del server
    console.log("Successful")
    })
    .catch(error => {
    // Gestisci l'errore
    console.error(error);
    });
}