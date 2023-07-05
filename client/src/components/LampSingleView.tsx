import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LampItem from "../types/LampItem";

const LampSingleView: React.FC = () => {
  const [lamp, setLamp] = useState<LampItem | null>(null);
  const { id } = useParams<{ id: string }>(); // Accesso al parametro id passandolo a useParams()

  useEffect(() => {
    fetchData();
  }, []); //Anche se il compilatore da warning, mantenere l'array vuoto per evitare loop infiniti, dato che
  //effettua la richiesta ad ogni render della pagina

  const fetchData = async () => {
    axios.defaults.baseURL = "http://localhost:5000/api";
    try {
      const response = await axios.get<LampItem>(`lampioni/${id}`);
      setLamp(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //È presente una funzione con operatore ternario, che permette la
  //visualizzazione dei dati solo se lamp non è null, inoltre identifica il
  //lampione in base all'id passato come parametro dalla richiesta GET
  return (
    <div>
      {lamp ? (
        <div key={lamp.id}>
          <h1>Info sul lampione {lamp.id}</h1>
          <h3>Id: {lamp.id}</h3>
          <ul>
            <li>Stato: {lamp.stato}</li>
            <li>Luminosit&agrave;: {lamp.lum}</li>
            <li>Luogo: {lamp.luogo}</li>
          </ul>
        </div>
      ) : (
        <p>Nessun dato disponibile</p>
      )}
      <Link to="/home" type="button" className="btn btn-primary">
        Indietro
      </Link>
    </div>
  );
};

export default LampSingleView;
