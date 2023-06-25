import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LampItem from "../types/LampItem";

const EditForm: React.FC = () => {
  axios.defaults.baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();
  const [lampioneData, setLampioneData] = useState<LampItem>({
    id: 0,
    stato: "",
    lum: 0,
    luogo: "",
  });

  useEffect(() => {
    if (lampioneData.id !== 0) {
      axios
        .get<LampItem>(`/lampioni/${lampioneData.id}`)
        .then((response) => {
          setLampioneData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [lampioneData.id]);

  return (
    <Formik
      initialValues={{
        id: lampioneData.id || 0,
        stato: lampioneData.stato || "",
        lum: lampioneData.lum || 0,
        luogo: lampioneData.luogo || "",
      }}
      validationSchema={Yup.object({
        luogo: Yup.string()
          .min(2, "Inserisci almeno 2 caratteri")
          .required("Campo obbligatorio")
          .trim(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const url = `/lampioni/edit/${values.id}`;
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
          <label htmlFor="stato">Stato</label>
          <Field name="stato" as="select">
            <option value="Attivo">Attivo</option>
            <option value="Disattivo">Disattivo</option>
          </Field>
        </div>

        <div className="form-group">
          <label htmlFor="lum">Intensit&agrave;</label>
          <Field name="lum" as="select" className="form-group">
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
            Indica l'intensit&agrave; luminosa del lampione qualora fosse
            importato lo stato di attivazione.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="luogo">Luogo di Installazione</label>
          <Field
            name="luogo"
            type="text"
            className="form-control"
            id="luogo"
            aria-describedby="luogoHelp"
            placeholder=""
          />
          <small id="luogoHelp" className="form-text text-muted">
            Indica il luogo in cui è situato il lampione.
          </small>
          <ErrorMessage name="luogo" />
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

export default EditForm;
