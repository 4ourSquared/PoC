import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LampsFullView } from "../components/LampsFullView";
import { LampsSingleView } from "../components/LampsSingleView";
import { NewLampPage } from "../components/new_lamp_page";

export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LampsFullView} />
        <Route path="api/lampioni/:id" Component={LampsSingleView} />
        <Route path="api/lampioni/add" Component={NewLampPage}/>
      </Routes>
    </Router>
  );
};
