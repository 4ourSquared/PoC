import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LampGuastiTable from "./LampGuastiTable";

export default class LampGuastiPage extends Component<{ areaId: number }> {
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
}
