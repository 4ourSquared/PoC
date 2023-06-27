import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SensItem from "../types/SensItem";

const SensSingleView: React.FC = () => {
  const [sens, setSens] = useState<SensItem | null>(null);
  const { id } = useParams<{ id: string }>(); // Accesso al parametro id passandolo a useParams()

  useEffect(() => {
    fetchData();
  }, []); //Anche se il compilatore da warning, mantenere l'array vuoto per evitare loop infiniti, dato che
  //effettua la richiesta ad ogni render della pagina

  const fetchData = async () => {
    axios.defaults.baseURL = "http://localhost:5000/api";
    try {
      const response = await axios.get<SensItem>(`sensori/${id}`);
      setSens(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //È presente una funzione con operatore ternario, che permette la
  //visualizzazione dei dati solo se sens non è null, inoltre identifica il
  //sensore in base all'id passato come parametro dalla richiesta GET
  return (
    <div>
      {sens ? (
        <div key={sens.id}>
          <h1>Info sul sensore {sens.id}</h1>
          <h3>Id: {sens.id}</h3>
          <ul>
            <li>Interazione: {sens.iter}</li>
            <li>Indirizzo IP: {sens.IP}</li>
            <li>Luogo: {sens.luogo}</li>
            <li>Raggio d'azione: {sens.raggio}</li>
          </ul>
        </div>
      ) : (
        <p>Nessun dato disponibile</p>
      )}
      <Link to="/" type="button" className="btn btn-primary">
        Indietro
      </Link>
    </div>
  );
};

export default SensSingleView;