import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

/*
  CLASSE NEWLAMPFORM: classe che renderizza automaticamente la struttura HTML della pagina di aggiunta di un lampione, definendo anche il metodo per la trasmissione dei dati al server. Stile associato a Bootstrap.
  ATTENZIONE: Bisogna ancora implementare l'avanzamento automatico del campo ID affinchè tale chiave sia univoca per l'identificazione del lampione.
*/
const NewLampForm: React.FC = () => {
  axios.defaults.baseURL = "http://localhost:5000/api"; //URL base, così una volta in produzione basta cambiare questo
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita l'invio di un form di default
    const formElement = event.target as HTMLFormElement; // Individuo il form nella pagina HTML
    const formData = new FormData(formElement); // Creo un oggetto che avrà i dati del form
    const data = Object.fromEntries(formData.entries()); // Creo un oggetto che prende le entries del form

    try {
      await axios.post("/lampioni", data); // Invio dei dati al server
      navigate("/"); //va aggiunto check, nel caso di errore fornire una pagina di errore
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <form title="Form per inserimento nuovo lampione" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID (Automatico)</label>
          <input
            className="form-control"
            type="text"
            defaultValue="NULL"
            name="id"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="stato">Stato</label>
          <select className="form-control" id="stato" name="stato">
            <option>Attivo</option>
            <option>Disattivo</option>
          </select>
          <small id="statusHelp" className="form-text text-muted">
            Indica se il lampione deve essere attivo o no al momento
            dell'inserimento a sistema.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="lum">Intensità Luminosa</label>
          <select className="form-control" id="lum" name="lum">
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
            Indica l'intensità luminosa del lampione qualora fosse fosse
            importato lo stato di attivazione.
          </small>
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
          />
          <small id="locazioneHelp" className="form-text text-muted">
            Indica il luogo in cui è situato il lampione.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Crea
        </button>
      </form>
    </div>
  );
};
export default NewLampForm;
