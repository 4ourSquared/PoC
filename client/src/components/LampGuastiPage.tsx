import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LampGuastiTable from "./LampGuastiTable";

export default class LampGuastiPage extends Component<{ areaId: number }> {
<<<<<<< HEAD
    render() {
        return (
            <>
                <Header />
                <h2>Lista degli impianti luminosi guasti</h2>
                <LampGuastiTable areaId={areaId}/>
                <Footer />
            </>
        );
    }
=======
  render() {
    const { areaId } = this.props;
    return (
      <>
        <Header />
        <h2>Lista degli impianti luminosi guasti</h2>
        <LampGuastiTable areaId={areaId} />
        <Footer />
      </>
    );
  }
>>>>>>> 29c19a230ce05c45ed538c8ed152006f0610b9c4
}
