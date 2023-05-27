import React, { Component } from "react";
import { Header } from "./breadcrumb";
import { NewLampForm } from "./new_lamp_form";
import { Footer } from "./footer";

export class NewLampPage extends Component {
  render() {
    return (
      <>
        <Header />
        <NewLampForm/>
        <Footer />
      </>
    );
  }
}