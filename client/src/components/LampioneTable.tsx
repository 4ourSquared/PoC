import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NewLampForm } from "./NewLampForm";
import testRequest from "./testRequest";

// Provo a creare la parte di programma che legge il JSON inviato dal server per generare la tabella
export class LampioneTable extends Component {
  render(){
    return(
      <>
        <div className="row justify-content-center">
        <Link to={`api/lampioni/add`} type="button" className="btn btn-primary">
          Aggiungi Lampione
        </Link>
        <button type="button" className="btn btn-primary" onClick={loadLampioni}>Aggiorna Lista</button>
        <table
          className="table table-hover align-middle"
          style={{ width: "90%" }}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Stato</th>
              <th scope="col">Intensità</th>
              <th scope="col">Zona Illuminata</th>
              <th scope="col">Info</th>
            </tr>
          </thead>
          <tbody id="tableBody">

          </tbody>
          </table>
        </div>
      </>
    )
  }
}

function loadLampioni(){
  const xhttp = new XMLHttpRequest();

  // Creazione della connessione per la richiesta dei dati
  xhttp.open("GET", "http://localhost:5000/api/lampioni", false);
  xhttp.send();

  // Parsing dei dati
  const lampioni = JSON.parse(xhttp.responseText);

  // Render dei dati in forma tabellare
    const tableBody = document.getElementById('tableBody')!;

  for (let lampione of lampioni) {
    let stat;
    if (lampione.stato === 'Attivo') {
      stat = '<td style="background-color: yellow">ON</td>';
    } else {
      stat = '<td style="background-color: black; color: white">OFF</td>';
    }

    const row = document.createElement('tr');

    const idCell = document.createElement('th');
    idCell.scope = 'row';
    idCell.textContent = lampione.id.toString();
    row.appendChild(idCell);

    row.innerHTML += stat;

    const intensitaCell = document.createElement('td');
    intensitaCell.textContent = lampione.intensita.toString();
    row.appendChild(intensitaCell);

    const luogoCell = document.createElement('td');
    luogoCell.textContent = lampione.luogo;
    row.appendChild(luogoCell);

    const buttonCell = document.createElement('td');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-info';
    button.textContent = 'Info';
    button.addEventListener('click', () => testRequest(lampione.id));
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

    tableBody.appendChild(row);
  }
}

