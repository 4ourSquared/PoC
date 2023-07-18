import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAmministratore,isManutentore } from "../auth/LoginState";
import LampItem from "../types/LampItem"; // Import del tipo LampItem, da rimuovere in futuro
import { Tooltip } from 'react-tooltip'

interface LampTableProps {
  // Per definire i props, se necessari
}

const LampTable: React.FC<LampTableProps> = () => {
  const [lampioni, setLampioni] = useState<LampItem[]>([]);
  const [isAdmin] = useState(isAmministratore());
  const [isManut] = useState(isManutentore());
  const navigate = useNavigate();

  useEffect(() => {
    loadLampioni()
  }, []);

  const loadLampioni = async () => {
    try {
      const response = await axios.get<LampItem[]>(
        "http://localhost:5000/api/lampioni"
      );
      setLampioni(response.data);
      console.error("porcodio")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const markGuasto = async (id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/lampioni/guasti/add/${id}`
      );
      const confirmed = window.confirm(response.data);
    } catch (error:any) {
      window.confirm(error.response.data);
      console.error("Errore nell'aggiunta guasto:", error);
    }
  };

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
  
  const showListaGuasti = async () => {
    navigate(`/api/lampioni/guasti`)
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
              {isAdmin && <th scope="col">Guasto</th>}
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
                {isAdmin && 
                <td>
                  {lampione.guasto 
                    ?
                    <>
                      <span style={{cursor:"default"}} data-tooltip-id="x" data-tooltip-content="Già marcato come guasto">
                        {'\u274c'}
                      </span>
                      <Tooltip id="x" />
                    </>
                    :
                    <button className="btn btn-dark"
                      onClick={() => markGuasto(lampione.id)}
                    >
                      Segnala guasto
                    </button>
                  }
                </td>
                }
              </tr>
            ))}
          </tbody>
        </table>

        {isManut &&
        <button className="btn btn-secondary"
        onClick={() => showListaGuasti()}>Vai alla lista guasti</button>
        }
      </div>
  );
};
export default LampTable;