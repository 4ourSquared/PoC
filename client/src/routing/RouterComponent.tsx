import React, {useState} from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditLampForm from "../components/EditLampForm";
import EditSensForm from "../components/EditSensForm";
import EditAreaForm from "../components/EditAreaForm";
import NewLampPage from "../components/NewLampPage";
import NewSensPage from "../components/NewSensPage";
import NewAreaPage from "../components/NewAreaPage";
import LampsSingleView from "../components/LampSingleView";
import SensSingleView from "../components/SensSingleView";
import AreaSingleView from "../components/AreaSingleView";
import LoginPage from "../components/LoginPage";
import PageFullView from "../components/PageFullView";
import GuardedRoute from "./GuardedRoute";


/*
  ANONYMOUS FUNCTION ROUTERCOMPONENT: componente fittizio che si pone l'obiettivo di gestire il routing dell'applicazione. Qualora si digitasse il "path", verrebbe renderizzato sulla pagina
                                      il "component"
*/
const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>

      <Route path="login" Component={LoginPage} />

      <Route element={<GuardedRoute redirectRoute="/login"/>}>
        <Route path="/" Component={PageFullView} />
        <Route path="api/lampioni/:id" Component={LampsSingleView} />
        <Route path="api/lampioni/edit/:id" Component={EditLampForm} />
        <Route path="api/lampioni/add" Component={NewLampPage} />
        <Route path="api/sensori/:id" Component={SensSingleView} />
        <Route path="api/sensori/add" Component={NewSensPage} />
        <Route path="api/sensori/edit/:id" Component={EditSensForm} />
        <Route path="api/aree/:id" Component={AreaSingleView} />
        <Route path="api/aree/add" Component={NewAreaPage} />
        <Route path="api/aree/edit/:id" Component={EditAreaForm} />
      </Route>

        
      </Routes>
    </Router>
  );
};
export default RouterComponent;
