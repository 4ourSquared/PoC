import React, { Component } from "react";
import NewSensForm from "./NewSensForm";
import Header from "./Header";
import Footer from "./Footer";

/*
  CLASS NEWSENSPAGE: classe che renderizza automaticamente l'intera pagina contenente il form per l'aggiunta di un nuovo sensore.
*/
export default class NewSensPage extends Component<{ areaId: number }> {
  render() {
    const { areaId } = this.props;
    return (
      <>
        <Header />
        <NewSensForm />
        <Footer />
      </>
    );
  }
}
