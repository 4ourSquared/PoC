import React, { Component } from "react";
import NewLampForm from "./NewLampForm";
import { Header } from "./breadcrumb";
import { Footer } from "./footer";

/*
  CLASS NEWLAMPPAGE: classe che renderizza automaticamente l'intera pagina contenente il form per l'aggiunta di un nuovo lampione.
*/
export class NewLampPage extends Component {
  render() {
    return (
      <>
        <Header />
        <NewLampForm />
        <Footer />
      </>
    );
  }
}
