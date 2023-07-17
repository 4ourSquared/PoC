import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AreaItem from "../types/AreaItem";
import LampItem from "../types/LampItem";
import SensItem from "../types/SensItem";
import LampTable from "./LampTable";
import SensTable from "./SensTable";

const AreaSingleView: React.FC = () => {
  const [area, setArea] = useState<AreaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { areaId } = useParams<{ areaId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      console.log("areaId: ", areaId);
      if (!areaId) {
            console.error('areaId is undefined');
            return;
        }
  try {
    const [areaResponse, lampioniResponse, sensoriResponse] = await Promise.all([
      axios.get<AreaItem>(`/aree/${areaId}`),
      axios.get<LampItem[]>(`/aree/${areaId}/lampioni`),
      axios.get<SensItem[]>(`/aree/${areaId}/sensori`),
    ]);
    const areaData = areaResponse.data;
    areaData.lampioni = lampioniResponse.data;
    areaData.sensori = sensoriResponse.data;
    setArea(areaData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
    fetchData();
  }, [areaId]);

 return (
    <div>
      {loading ? (
        <p>Caricamento...</p>
      ) : area ? (
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
          <div className="row">
            <LampTable areaId={areaId} />
          </div>
          <h2>Sensori Collegati</h2>
          <div className="row">
            <SensTable areaId={areaId} />
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
