import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LampItem from "../types/LampItem";

//TODO - Modificare le routes

<<<<<<< HEAD
export default function LampGuastiTable(areaId:Number) {
    const [lampioni, setLampioni] = useState<LampItem[]>([]);
    const navigate = useNavigate();
=======
const LampGuastiTable: React.FC<{ areaId: number }> = ({ areaId }) => {
  const [lampioni, setLampioni] = useState<LampItem[]>([]);
  const navigate = useNavigate();
>>>>>>> 29c19a230ce05c45ed538c8ed152006f0610b9c4

  useEffect(() => {
    loadLampioni();
  }, []);

<<<<<<< HEAD
    const loadLampioni = async () => {
        try {
            const response = await axios.get<LampItem[]>(
                `http://localhost:5000/api/aree/${areaId}/guasti/`
            );
            setLampioni(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const removeLampione = async (id: Number) => {
        try {
            await axios.put<LampItem[]>(
                `http://localhost:5000/api/aree/${areaId}/guasti/remove/${id}`
            );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
=======
  const loadLampioni = async () => {
    try {
      const response = await axios.get<LampItem[]>(
        `http://localhost:5000/api/${areaId}/lampioni/guasti/`
      );
      setLampioni(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeLampione = async (id: Number) => {
    try {
      await axios.put<LampItem[]>(
        `http://localhost:5000/api/lampioni/guasti/remove/${id}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
>>>>>>> 29c19a230ce05c45ed538c8ed152006f0610b9c4

  return (
    <table
      className="table table-hover align-middle"
      style={{ width: "90%" }} // Da spostare in un file CSS dedicato
    >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Zona Illuminata</th>
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
                onClick={() => navigate(`/api/lampioni/${lampione.id}`)}
              >
                Info
              </button>
            </td>
            <td>
              <button
                className="btn btn-dark"
                onClick={() => removeLampione(lampione.id)}
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
