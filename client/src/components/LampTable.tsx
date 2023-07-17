import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LampItem from "../types/LampItem";

interface LampTableProps {
  lampioni: LampItem[];
  onLampioneDeleted: (id: number) => void; // Aggiunta di una nuova prop
  areaId: number; // Aggiunta dell'ID dell'area come prop
}

const LampTable: React.FC<LampTableProps> = ({ lampioni, onLampioneDeleted, areaId }) => {
  const navigate = useNavigate();

 const deleteLampione = async (id: number) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare il lampione?"
    );
    try {
      if (confirmed) {
        await axios.delete(`http://localhost:5000/api/lampioni/${id}`);
        onLampioneDeleted(id); // Chiamata alla funzione di callback
      }
    } catch (error) {
      console.error("Errore nella cancellazione del lampione: ", error);
    }
  };


  return (
    <div className="row justify-content-center">
      <Link to={`/api/aree/${areaId}/lampioni/add`} type="button" className="btn btn-primary">
        Aggiungi Lampione
      </Link>
      <table className="table table-hover align-middle" style={{ width: "90%" }}>
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
