import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LampItem from "../types/LampItem";

const LampSingleView: React.FC = () => {
  const [lamp, setLamp] = useState<LampItem | null>(null);
  const { id } = useParams<{ id: string }>(); // Accesso al parametro id passandolo a useParams()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<LampItem>(
        `http://localhost:5000/api/lampioni/${id}`
      );
      setLamp(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Info sul lampione</h1>
      {lamp ? (
        <div key={lamp.id}>
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
    </div>
  );
};

export default LampSingleView;
