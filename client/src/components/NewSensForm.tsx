import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik"; //Metodo per creare i form in maniera più semplice e funzionale
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"; //Libreria per la validazione del form: si può usare anche per il login

/*
  CLASSE NEWSENSFORM: classe che renderizza automaticamente la struttura HTML della pagina di aggiunta di un sensore, definendo anche il metodo per la trasmissione dei dati al server. Stile associato a Bootstrap.
  ATTENZIONE: L'id univoco è stato implementato in questa versione, non compare
  come valore iniziale dell'id ancora, bisogna rifarlo nel DB
*/
const NewSensForm: React.FC = () => {
  axios.defaults.baseURL = "http://localhost:5000/api"; //URL base, così una volta in produzione basta cambiare questo
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ id: 0, iter: "manuale", IP: "", luogo: "", raggio: 0 }}
      validationSchema={Yup.object({
        IP: Yup.string()
          .matches(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/ig,"Deve essre un indirizzo IP valido")
          .required("Campo obbligatorio")
          .trim(),
        luogo: Yup.string()
          .min(2, "Inserisci almeno 2 caratteri")
          .required("Campo obbligatorio")
          .trim(), //Grazie a questo pulisce il campo da spazi bianchi ed evito che il campo sia vuoto
        //Inoltre il form non si completa fino a che il campo non viene
        //riempito correttamente
      })}
      onSubmit={(values, { setSubmitting }) => {
        axios.post("/sensori", values); // Solito invio dei dati al server
        setSubmitting(false); //Serve a resettare la submit del form e riportarla False
        navigate("/");
      }}
    >
      <Form>
        <div className="form-group">
          <label htmlFor="id">ID (Automatico)</label>
          <Field name="id" type="text" className="form-control" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="iter">Interazione</label>
          <Field name="iter" as="select">
            <option value="manuale">Manuale</option>
            <option value="automatico">Automatico</option>
          </Field>
          <small id="statusHelp" className="form-text text-muted">
            Indica se il sensore ha un controllo sui lampioni (automatico) o se i lampioni saranno modificati manualmente da un utente
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="IP">Indirizzo IP</label>
          <Field
            name="IP"
            type="text"
            className="form-control"
            id="IP"
            placeholder=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="Locazione">Luogo di Installazione</label>
          <Field
            name="luogo"
            type="text"
            className="form-control"
            id="luogo"
            aria-describedby="luogoHelp"
            placeholder=""
          />
          <small id="locazioneHelp" className="form-text text-muted">
            Indica il luogo in cui è situato il sensore.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="raggio">Raggio d'azione</label>
          <Field name="raggio" as="select" className="form-group">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Field>
          <small id="intensityHelp" className="form-text text-muted">
            Indica il raggio d'azione (in metri) del sensore.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Crea
        </button>
        <button type="reset" className="btn btn-secondary">
          Resetta
        </button>
        <Link to="/" type="button" className="btn btn-outline-primary">
          Indietro
        </Link>
      </Form>
    </Formik>
  );
};
export default NewSensForm;
