import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AreaItem from "../types/AreaItem";
import LampTable from './LampTable'
import SensTable from './SensTable'

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

  //forse bisogna aggiundere render() e quindi modificare anche la funzione AreaSingleView come classe
  return (
    <div>
      {area ? (
        <div key={area.id}>
          <h1>Info sull'area {area.id}</h1>
          <h2>ID: {area.id}</h2>
          <ul>
            <li>Nome: {area.nome}</li>
            <li>Descrizione: {area.descrizione}</li>
            <li>Latitudine: {area.latitudine}</li>
            <li>Longitudine: {area.longitudine}</li>
          </ul>
          <h2>Lampioni Collegati</h2>
          <div className='row'>
            <LampTable/>
          </div>
          <h2>Sensori Collegati</h2>
          <div className='row'>
            <SensTable/>
          </div>
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
