import React, { Component } from "react";
import { Header } from "./breadcrumb";
import { Content } from "./contents";
import { Footer } from "./footer";
import { LampsSingleInfo } from "./LampsSingleInfo";

/*
  CLASSE LAMPSSINGLEVIEW: la classe renderizza automaticamente la pagina dedicata alla visualizzazione delle informazioni dettagliate riguardanti un lampione.
*/
export class LampsSingleView extends Component {
  render() {
    return (
      <>
        <Header />
        
        <Footer />
      </>
    );
  }
}
