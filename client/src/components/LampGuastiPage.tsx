import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LampGuastiTable from './LampGuastiTable';

export default class NewSensPage extends Component {
    render() {
      return (
        <>
          <Header />
          <h2>Lista degli impianti luminosi guasti</h2>
          <LampGuastiTable />
          <Footer />
        </>
      );
    }
  }