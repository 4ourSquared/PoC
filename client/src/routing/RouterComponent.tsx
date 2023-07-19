import React, { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditLampForm from "../components/EditLampForm";
import EditSensForm from "../components/EditSensForm";
import EditAreaForm from "../components/EditAreaForm";
import NewLampPage from "../components/NewLampPage";
import NewSensPage from "../components/NewSensPage";
import NewAreaPage from "../components/NewAreaPage";
import LampSingleView from "../components/LampSingleView";
import SensSingleView from "../components/SensSingleView";
import AreaSingleView from "../components/AreaSingleView";
import LoginPage from "../components/LoginPage";
import PageFullView from "../components/PageFullView";
import GuardedRoute from "./GuardedRoute";
import { useParams } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return <h1>Page not found</h1>;
};

const NewLampPageWrapper: React.FC = () => {
  const { areaId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0; // converti in numero, usa 0 se undefined
  return <NewLampPage areaId={areaIdNumber} />;
};

const LampSingleViewWrapper: React.FC = () => {
  const { areaId, lampioneId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  const lampioneIdNumber = lampioneId ? parseInt(lampioneId) : 0;
  return <LampSingleView areaId={areaIdNumber} lampioneId={lampioneIdNumber} />;
};

const EditLampFormWrapper: React.FC = () =>{
  const { areaId, lampioneId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  const lampioneIdNumber = lampioneId ? parseInt(lampioneId) : 0;
  return <EditLampForm areaId={areaIdNumber} lampioneId={lampioneIdNumber} />;
}


const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route element={<GuardedRoute redirectRoute="/login" />}>
          <Route path="api/aree/add" element={<NewAreaPage />} />
          <Route path="api/aree/edit/:areaId" element={<EditAreaForm />} />
          <Route path="api/aree/:areaId" element={<AreaSingleView />} />
          <Route path="api/aree/:areaId/lampioni/:lampioneId" element={<LampSingleViewWrapper />} />
          <Route path="api/aree/:areaId/lampioni/edit/:lampioneId" element={<EditLampFormWrapper />} />
          <Route path="api/aree/:areaId/lampioni/add" element={<NewLampPageWrapper />} />
          <Route path="api/aree/:areaId/sensori/:sensoreId" element={<SensSingleView />} />
          <Route path="api/aree/:areaId/sensori/edit/:sensoreId" element={<EditSensForm />} />
          <Route path="api/aree/:areaId/sensori/add" element={<NewSensPage />} />
          <Route path="" element={<PageFullView />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} /> {/* Pagina di fallback per tutte le altre route non corrispondenti */}
      </Routes>
    </Router>
  );
};

export default RouterComponent;