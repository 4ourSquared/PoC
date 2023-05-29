import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NewLampForm } from "./NewLampForm";
import testRequest from "./testRequest";

/*
export class LampioneTable extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <Link to={`api/lampioni/add`} type="button" className="btn btn-primary">
          Aggiungi Lampione
        </Link>
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
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td style={{ backgroundColor: "yellow" }}>ON</td>
              <td>5</td>
              <td>Piazza Mazzini</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => testRequest(1)}
                >
                  Info
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td style={{ backgroundColor: "black", color: "white" }}>OFF</td>
              <td>8</td>
              <td>Via Crescente</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => testRequest(2)}
                >
                  Info
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td style={{ backgroundColor: "yellow" }}>ON</td>
              <td>7</td>
              <td>Navigli</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => testRequest(3)}
                >
                  Info
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
*/

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
    for (let lampione of lampioni) {
      let stat;
      if (lampione.stato) {
        stat = '<td style="background-color: yellow">ON</td>';
      } else {
        stat = '<td style="background-color: black; color: white">OFF</td>';
      }
    
      //let fun = `onClick={() => testRequest(${lampione.id})}`;
      const x = `
        <tr>
          <th scope="row">${lampione.id}</th>
          ${stat}
          <td>${lampione.intensita}</td>
          <td>${lampione.luogo}</td>
          <td>
          <button type="button" class="btn btn-outline-info" id="btn-${lampione.id}">
              Info
            </button>
          </td>
        </tr>
      `;
    
      // Aggiungi la riga generata al corpo della tabella
      document.getElementById('tableBody')!.innerHTML += x;
      const button = document.getElementById(`btn-${lampione.id}`)!;
      button.addEventListener('click', () => testRequest(lampione.id));
    }
    
  }

