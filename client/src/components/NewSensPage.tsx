import React, { Component } from "react";
import NewSensForm from "./NewSensForm";
import { Header } from "./breadcrumb";
import { Footer } from "./footer";

/*
  CLASS NEWLAMPPAGE: classe che renderizza automaticamente l'intera pagina contenente il form per l'aggiunta di un nuovo lampione.
*/
export class NewSensPage extends Component {
  render() {
    return (
      <>
        <Header />
        <NewSensForm />
        <Footer />
      </>
    );
  }
}
