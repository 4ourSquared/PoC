import React, { Component } from "react";
import { NewLampForm } from "./NewLampForm";
import { Header } from "./breadcrumb";
import { Footer } from "./footer";

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
