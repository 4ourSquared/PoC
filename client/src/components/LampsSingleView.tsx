import React, { Component } from "react";
import { LampsSingleInfo } from "./LampsSingleInfo";
import { Header } from "./breadcrumb";
import { Content } from "./contents";
import { Footer } from "./footer";

/*
  CLASSE LAMPSSINGLEVIEW: la classe renderizza automaticamente la pagina dedicata alla visualizzazione delle informazioni dettagliate riguardanti un lampione.
*/
export class LampsSingleView extends Component {
  render() {
    return (
      <>
        <Header />
        <h1>Info del lampione id: da passare</h1>

        <Footer />
      </>
    );
  }
}
