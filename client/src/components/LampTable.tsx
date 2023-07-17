import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LampItem from "../types/LampItem"; // Import del tipo LampItem, da rimuovere in futuro

interface LampTableProps {
  areaId: string | undefined;
}

const LampTable: React.FC<LampTableProps> = ({ areaId }) => {
  const [lampioni, setLampioni] = useState<LampItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLampioni = async () => {
  try {
    const response = await axios.get<LampItem[]>(
      `http://localhost:5000/api/aree/${areaId}/lampioni`
    );
    setLampioni(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
    loadLampioni();
  }, [areaId]);

  const deleteLampione = async (id: number) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare il lampione?"
    );
    try {
      if (confirmed) {
        await axios.delete(`http://localhost:5000/api/lampioni/${id}`);
        setLampioni((cur) => cur.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Errore nella cancellazione del lampione: ", error);
    }
  };

  return (
      <div className="row justify-content-center">
        <Link to="/api/lampioni/add" type="button" className="btn btn-primary">
          Aggiungi Lampione
        </Link>
        <table
          className="table table-hover align-middle"
          style={{ width: "90%" }} // Da spostare in un file CSS dedicato
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Stato</th>
              <th scope="col">Intensità</th>
              <th scope="col">Zona Illuminata</th>
              <th scope="col">Info</th>
              <th scope="col">Modifica</th>
              <th scope="col">Elimina</th>
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
                <td>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate(`/api/lampioni/edit/${lampione.id}`)
                    }
                  >
                    Modifica
                  </button>

                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteLampione(lampione.id)}
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};
export default LampTable;