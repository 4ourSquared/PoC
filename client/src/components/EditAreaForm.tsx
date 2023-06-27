import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import AreaItem from "../types/AreaItem";

const EditAreaForm: React.FC = () => {
  axios.defaults.baseURL = "http://localhost:5000/api";
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [area, setArea] = useState<AreaItem>({
    id: Number(paramId),
    nome: "",
    descrizione: "",
    latitudine: "",
    longitudine: "",
  });

  useEffect(() => {
    if (area.id !== 0) {
      axios
        .get<AreaItem>(`/aree/${area.id}`)
        .then((response) => {
          setArea(response.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [area.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{
        id: area.id || 0,
        nome: area.nome || "",
        descrizione: area.descrizione || "",
        latitudine: area.latitudine || "",
        longitudine: area.longitudine || "",
      }}
      validationSchema={Yup.object({
        nome: Yup.string()
          .min(2, "Inserisci almeno 2 caratteri")
          .required("Campo obbligatorio")
          .trim(),
        descrizione: Yup.string()
          .min(2, "Inserisci almeno 2 caratteri")
          .required("Campo obbligatorio")
          .trim(),
        latitudine: Yup.string()
          .required("Campo obbligatorio")
          .matches(
            /^-?([0-8]?[0-9]|90)\.[0-9]{1,6}$/,
            "Inserisci una latitudine valida"
          ),
        longitudine: Yup.string()
          .required("Campo obbligatorio")
          .matches(
            /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,6}$/,
            "Inserisci una longitudine valida"
          ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const url = `/aree/edit/${area.id}`;
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
          <label htmlFor="nome">Nome</label>
          <Field name="nome" type="text" className="form-control" />
          <ErrorMessage name="nome" />
        </div>

        <div className="form-group">
          <label htmlFor="descrizione">Descrizione</label>
          <Field name="descrizione" as="textarea" className="form-control" />
          <ErrorMessage name="descrizione" />
        </div>

        <div className="form-group">
          <label htmlFor="latitudine">Latitudine</label>
          <Field name="latitudine" type="text" className="form-control" />
          <ErrorMessage name="latitudine" />
        </div>

        <div className="form-group">
          <label htmlFor="longitudine">Longitudine</label>
          <Field name="longitudine" type="text" className="form-control" />
          <ErrorMessage name="longitudine" />
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

export default EditAreaForm;
