import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SensItem from "../types/SensItem";

const EditSensForm: React.FC = () => {
  axios.defaults.baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [sens, setSens] = useState<SensItem>({
    id: Number(paramId),
    iter: "manuale",
    IP: "",
    luogo: "",
    raggio: 0,
  });

  useEffect(() => {
    if (sens.id !== 0) {
      axios
        .get<SensItem>(`/sensori/${sens.id}`)
        .then((response) => {
          setSens(response.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [sens.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{
        id: sens.id || 0,
        iter: sens.iter || "manuale",
        IP: sens.IP || "",
        luogo: sens.luogo || "",
        raggio: sens.raggio || 0,
      }}
      validationSchema={Yup.object({
        IP: Yup.string()
          .matches(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/ig,"Deve essre un indirizzo IP valido")
          .required("Campo obbligatorio")
          .trim(),
        luogo: Yup.string()
          .min(2, "Inserisci almeno 2 caratteri")
          .required("Campo obbligatorio")
          .trim(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const url = `/sensori/edit/${sens.id}`;
        axios
          .put(url, values)
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      
      <Form>
        <div className="form-group">
          <label htmlFor="id">ID (Automatico)</label>
          <Field name="id" type="text" className="form-control" readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="iter">Interazione</label>
          <Field name="iter" as="select" className="form-control">
            <option value="manuale">Manuale</option>
            <option value="automatico">Automatico</option>
          </Field>
          <small id="statusHelp" className="form-text text-muted">
            Indica se il sensore ha un controllo sui lampioni (automatico) o se i lampioni saranno modificati manualmente da un utente.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="IP">Indirizzo IP</label>
          <Field name="IP" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="luogo">Luogo di Installazione</label>
          <Field name="luogo" type="text" className="form-control" />
          <small id="locazioneHelp" className="form-text text-muted">
            Indica il luogo in cui è situato il sensore.
          </small>
          <ErrorMessage name="luogo" />
        </div>

        <div className="form-group">
          <label htmlFor="raggio">Raggio d'azione</label>
          <Field name="raggio" as="select" className="form-control">
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
          Modifica
        </button>
        <Link to="/" type="button" className="btn btn-outline-primary">
          Indietro
        </Link>
      </Form>
    </Formik>
  );
};

export default EditSensForm;
