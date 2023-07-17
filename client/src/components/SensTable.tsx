import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SensItem from "../types/SensItem";

interface SensTableProps {
  areaId: string | undefined;
}

const SensTable: React.FC<SensTableProps> = ({ areaId }) => {
  const [sensori, setSensori] = useState<SensItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSensori = async () => {
    try {
      const response = await axios.get<SensItem[]>(
      `http://localhost:5000/api/aree/${areaId}/sensori`
      );
      setSensori(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    loadSensori();
  }, [areaId]);


  const deleteSensore = async (id: number) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare il sensore?"
    );
    try {
      if (confirmed) {
        await axios.delete(`http://localhost:5000/api/sensori/${id}`);
        setSensori((cur) => cur.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Errore nella cancellazione del sensore: ", error);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <Link to="/api/sensori/add" type="button" className="btn btn-primary">
          Aggiungi Sensore
        </Link>
        <table
          className="table table-hover align-middle"
          style={{ width: "90%" }}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tipo di interazione</th>
              <th scope="col">Indirizzo IP</th>
              <th scope="col">Zona Illuminata</th>
              <th scope="col">Raggio d'azione</th>
              <th scope="col">Info</th>
              <th scope="col">Modifica</th>
              <th scope="col">Elimina</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {sensori.map((sensore) => (
              <tr key={sensore.id}>
                <th scope="row">{sensore.id}</th>
                <td>{sensore.iter === "manuale" ? "Manuale" : "Automatico"}</td>
                <td>{sensore.IP}</td>
                <td>{sensore.luogo}</td>
                <td>{sensore.raggio}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/api/sensori/${sensore.id}`)}
                  >
                    Info
                  </button>
                </td>
                <td>
                  <Link
                    to={`/api/sensori/edit/${sensore.id}`}
                    type="button"
                    className="btn btn-outline-warning"
                  >
                    Modifica
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteSensore(sensore.id)}
                  >
                    Elimina
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
export default SensTable;