import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AreaItem from "../types/AreaItem";

const AreaSingleView: React.FC = () => {
  const [area, setArea] = useState<AreaItem | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    axios.defaults.baseURL = "http://localhost:5000/api";
    try {
      const response = await axios.get<AreaItem>(`aree/${id}`);
      setArea(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {area ? (
        <div key={area.id}>
          <h1>Info sull'area {area.id}</h1>
          <h3>ID: {area.id}</h3>
          <ul>
            <li>Nome: {area.nome}</li>
            <li>Descrizione: {area.descrizione}</li>
            <li>Latitudine: {area.latitudine}</li>
            <li>Longitudine: {area.longitudine}</li>
            <li>Sensori: {area.sensori.map(sensore => <p>{sensore.id}</p>)}</li> {/* Aggiunto */}
            <li>Lampioni: {area.lampioni.map(lampione => <p>{lampione.id}</p>)}</li> {/* Aggiunto */}
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

export default AreaSingleView;
