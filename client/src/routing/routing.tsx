import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditForm from "../components/EditForm";
import LampsSingleView from "../components/LampSingleView";
import { LampsFullView } from "../components/LampsFullView";
import { NewLampPage } from "../components/NewLampPage";

/*
  ANONYMOUS FUNCTION ROUTERCOMPONENT: componente fittizio che si pone l'obiettivo di gestire il routing dell'applicazione. Qualora si digitasse il "path", verrebbe renderizzato sulla pagina
                                      il "component"
*/
export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LampsFullView} />
        <Route path="api/lampioni/:id" Component={LampsSingleView} />
        <Route path="api/lampioni/edit/:id" Component={EditForm} />
        <Route path="api/lampioni/add" Component={NewLampPage} />
      </Routes>
    </Router>
  );
};
