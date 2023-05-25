import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LampsFullView } from "../components/LampsFullView";
import { LampsSingleView } from "../components/LampsSingleView";

export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LampsFullView} />
        <Route path="/lampione" Component={LampsSingleView} />
      </Routes>
    </Router>
  );
};
