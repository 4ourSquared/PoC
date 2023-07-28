import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LampItem from "../types/LampItem";

const LampGuastiTable: React.FC<{ areaId: number }> = ({ areaId }) => {
  const [lampioni, setLampioni] = useState<LampItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadLampioni();
  }, []);

    const loadLampioni = async () => {
        try {
            const response = await axios.get<LampItem[]>(
        `http://localhost:5000/api/aree/${areaId}/lampioni/guasti/`
            );
            setLampioni(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const removeLampione = async (id: Number) => {
        try {
            await axios.put<LampItem[]>(
        `http://localhost:5000/api/aree/${areaId}/lampioni/guasti/remove/${id}`
            );
            window.confirm("Lampione non più marcato come guasto!")
        } catch (error) {
            window.confirm("Errore")
            console.error("Error fetching data:", error);
        }
    };

  return (
    <table
      className="table table-hover align-middle"
      style={{ width: "90%" }} // Da spostare in un file CSS dedicato
    >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Zona Illuminata</th>
          <th scope="col">Informazioni</th>
          <th scope="col">Marca come Riparato</th>
        </tr>
      </thead>
      <tbody id="tableBody">
        {lampioni.map((lampione) => (
          <tr key={lampione.id}>
            <th scope="row">{lampione.id}</th>
            <td>{lampione.luogo}</td>
            <td>
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/api/aree/${areaId}/lampioni/${lampione.id}`)}
              >
                Info
              </button>
            </td>
            <td>
              <button
                className="btn btn-dark"
                onClick={() => {removeLampione(lampione.id); navigate(`/`)}}
              >
                Marca come riparato
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LampGuastiTable;
