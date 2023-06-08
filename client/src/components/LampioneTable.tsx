import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LampItem from "../types/LampItem"; // Import the LampItem type from your types file

interface LampioneTableProps {
  // Per definire i props, se necessari
}

export const LampioneTable: React.FC<LampioneTableProps> = () => {
  const [lampioni, setLampioni] = useState<LampItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLampioni();
  }, []);

  const loadLampioni = async () => {
    try {
      const response = await axios.get<LampItem[]>(
        "http://localhost:5000/api/lampioni"
      );
      setLampioni(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <Link to="api/lampioni/add" type="button" className="btn btn-primary">
          Aggiungi Lampione
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={loadLampioni}
        >
          Aggiorna Lista
        </button>
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
            {lampioni.map((lampione) => (
              <tr key={lampione.id}>
                <th scope="row">{lampione.id}</th>
                <td>{lampione.stato === "Attivo" ? "ON" : "OFF"}</td>
                <td>{lampione.lum}</td>
                <td>{lampione.luogo}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/api/lampioni/${lampione.id}`)}
                  >
                    Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
