import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LampsSingleView from "../components/LampSingleView";
import SensSingleView from "../components/SensSingleView";
import { PageFullView } from "../components/PageFullView";
import { LampsFullView } from "../components/LampsFullView";
import { NewLampPage } from "../components/NewLampPage";
import { NewSensPage } from "../components/NewSensPage";
import EditSensForm from "../components/EditSensForm";
import AreaSingleView from "../components/AreaSingleView";
import { NewAreaPage } from "../components/NewAreaPage";
import EditAreaForm from "../components/EditAreaForm";

/*
  ANONYMOUS FUNCTION ROUTERCOMPONENT: componente fittizio che si pone l'obiettivo di gestire il routing dell'applicazione. Qualora si digitasse il "path", 
  verrebbe renderizzato sulla pagina il "component"
*/
export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LampsFullView} />
        <Route path="api/lampioni/:id" Component={LampsSingleView} />
        <Route path="api/lampioni/add" Component={NewLampPage} />
        <Route path="/" element={<PageFullView />} />
        <Route path="/api/lampioni/:id" element={<LampsSingleView />} />
        <Route path="/api/lampioni/add" element={<NewLampPage />} />
        <Route path="/api/sensori/:id" element={<SensSingleView />} />
        <Route path="/api/sensori/add" element={<NewSensPage />} />
        <Route path="/api/sensori/edit/:id" element={<EditSensForm />} />
        <Route path="/api/aree/:id" element={<AreaSingleView />} />
        <Route path="/api/aree/add" element={<NewAreaPage />} />
        <Route path="/api/aree/edit/:id" element={<EditAreaForm />} />
      </Routes>
    </Router>
  );
};
