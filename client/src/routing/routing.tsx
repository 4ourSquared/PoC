import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LampsSingleView from "../components/LampSingleView";
import SensSingleView from "../components/SensSingleView";
import { PageFullView } from "../components/PageFullView";
import { NewLampPage } from "../components/NewLampPage";
import { NewSensPage } from "../components/NewSensPage";
import EditSensForm from "../components/EditSensForm";

/*
  ANONYMOUS FUNCTION ROUTERCOMPONENT: componente fittizio che si pone l'obiettivo di gestire il routing dell'applicazione. Qualora si digitasse il "path", verrebbe renderizzato sulla pagina
                                      il "component"
*/
export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PageFullView} />
        <Route path="api/lampioni/:id" Component={LampsSingleView} />
        <Route path="api/lampioni/add" Component={NewLampPage} />
        <Route path="api/sensori/:id" Component={SensSingleView} />
        <Route path="api/sensori/add" Component={NewSensPage} />
        <Route path="api/sensori/edit/:id" Component={EditSensForm} />
      </Routes>
    </Router>
  );
};
