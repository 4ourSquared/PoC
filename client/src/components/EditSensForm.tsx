import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SensItem from "../types/SensItem";

/*
  CLASSE EDITFORM: classe che renderizza automaticamente la struttura HTML della pagina di modifica di un lampione, definendo anche il metodo per la trasmissione dei dati al server. Stile associato a Bootstrap.
*/

const EditSensForm: React.FC = () => {
  const navigate = useNavigate();
  const [sens, setSens] = useState<SensItem | null>(null);
  const { id } = useParams<{ id: string }>(); // Accesso al parametro id passandolo a useParams()

  useEffect(() => {
    fetchData();
  }, []); //Anche se il compilatore da warning, mantenere l'array vuoto per evitare loop infiniti, dato che
  //effettua la richiesta ad ogni render della pagina

  const fetchData = async () => {
    axios.defaults.baseURL = "http://localhost:5000/api";
    try {
      const response = await axios.get<SensItem>(`sensori/edit/${id}`);
      setSens(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita l'invio di un form di default
    const formElement = event.target as HTMLFormElement; // Individuo il form nella pagina HTML
    const formData = new FormData(formElement); // Creo un oggetto che avrà i dati del form
    const data = Object.fromEntries(formData.entries()); // Creo un oggetto che prende le entries del form

    try {
      await axios.post("/sensori", data); // Invio dei dati al server
      navigate("/"); //va aggiunto check, nel caso di errore fornire una pagina di errore
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {sens ? (
        <form title="Form per modifica sensore" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID (Automatico)</label>
          <input
            className="form-control"
            type="text"
            defaultValue="NULL"
            name="id"
            value={sens.id}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="iter">Interazione</label>
          <select className="form-control" id="iter" name="iter" value={sens.iter === "manuale" ? "Manuale" : "Automatico"}>
            <option>Manuale</option>
            <option>Automatico</option>
          </select>
          <small id="statusHelp" className="form-text text-muted">
            Indica se il sensore ha un controllo sui lampioni (automatico) o se i lampioni saranno modificati manualmente da un utente
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="IP">Indirizzo IP</label>
          <input
            type="text"
            className="form-control"
            id="IP"
            placeholder=""
            name="IP"
            value={sens.IP}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Locazione">Luogo di Installazione</label>
          <input
            type="text"
            className="form-control"
            id="Locazione"
            aria-describedby="locazioneHelp"
            placeholder=""
            name="luogo"
            value={sens.luogo}
          />
          <small id="locazioneHelp" className="form-text text-muted">
            Indica il luogo in cui è situato il sensore.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="raggio">Raggio d'azione</label>
          <select className="form-control" id="raggio" name="raggio" value={sens.raggio}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
          <small id="intensityHelp" className="form-text text-muted">
            Indica il raggio d'azione (in metri) del sensore.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Modifica
        </button>
        <Link to="/" type="button" className="btn btn-outline-primary">
          Indietro
        </Link>
      </form>
      ) : (
        <p>Nessun dato disponibile</p>
      )}
    </div>
  );
};
export default EditSensForm;