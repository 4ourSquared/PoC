import React from "react";
import NewAreaForm from "./NewAreaForm";
import { Header } from "./breadcrumb";
import { Footer } from "./footer";

export const NewAreaPage: React.FC = () => {
  return (
    <>
      <Header />
      <NewAreaForm />
      <Footer />
    </>
  );
};
