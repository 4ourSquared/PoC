import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import { isManutentore } from "../auth/LoginState";
import AreaSingleView from "../components/AreaSingleView";
import EditAreaForm from "../components/EditAreaForm";
import EditLampForm from "../components/EditLampForm";
import EditSensForm from "../components/EditSensForm";
import LampGuastiPage from "../components/LampGuastiPage";
import LampSingleView from "../components/LampSingleView";
import LoginPage from "../components/LoginPage";
import NewAreaPage from "../components/NewAreaPage";
import NewLampPage from "../components/NewLampPage";
import NewSensPage from "../components/NewSensPage";
import PageFullView from "../components/PageFullView";
import SensSingleView from "../components/SensSingleView";
import GuardedRoute from "./GuardedRoute";

//TODO - Probabilmente ci saranno da creare dei nuovi wrapper e delle nuove routes

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

const EditLampFormWrapper: React.FC = () => {
  const { areaId, lampioneId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  const lampioneIdNumber = lampioneId ? parseInt(lampioneId) : 0;
  return <EditLampForm areaId={areaIdNumber} lampioneId={lampioneIdNumber} />;
};

const NewSensPageWrapper: React.FC = () => {
  const { areaId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0; // converti in numero, usa 0 se undefined
  return <NewSensPage areaId={areaIdNumber} />;
};

const SensSingleViewWrapper: React.FC = () => {
  const { areaId, sensoreId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  const sensoreIdNumber = sensoreId ? parseInt(sensoreId) : 0;
  return <SensSingleView areaId={areaIdNumber} sensoreId={sensoreIdNumber} />;
};

const EditSensFormWrapper: React.FC = () => {
  const { areaId, sensoreId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  const sensIdNumber = sensoreId ? parseInt(sensoreId) : 0;
  return <EditSensForm areaId={areaIdNumber} sensoreId={sensIdNumber} />;
};

const EditAreaFormWrapper: React.FC = () => {
  const { areaId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  return <EditAreaForm areaId={areaIdNumber} />;
};

const GuastiPageWrapper: React.FC = () => {
  const { areaId } = useParams();
  const areaIdNumber = areaId ? parseInt(areaId) : 0;
  return <LampGuastiPage areaId={areaIdNumber} />;
};

const LampGuastiWrapper: React.FC = () => {
    const { areaId } = useParams();
    const areaIdNumber = areaId ? parseInt(areaId) : 0;
    return <LampGuastiPage areaId={areaIdNumber} />;
};

const RouterComponent: React.FC = () => {
<<<<<<< HEAD
    return (
        <Router>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route element={<GuardedRoute redirectRoute="/login" />}>
                    <Route 
                        path="api/aree/add"
                        element={<NewAreaPage />} 
                    />
                    <Route
                        path="api/aree/edit/:areaId"
                        element={<EditAreaFormWrapper />}
                    />
                    <Route
                        path="api/aree/:areaId"
                        element={<AreaSingleView />}
                    />
                    <Route
                        path="api/aree/:areaId/lampioni/:lampioneId"
                        element={<LampSingleViewWrapper />}
                    />
                    <Route
                        path="api/aree/:areaId/lampioni/edit/:lampioneId"
                        element={<EditLampFormWrapper />}
                    />
                    <Route
                        path="api/aree/:areaId/lampioni/add"
                        element={<NewLampPageWrapper />}
                    />
                    <Route
                        path="api/aree/:areaId/sensori/:sensoreId"
                        element={<SensSingleViewWrapper />}
                    />
                    <Route
                        path="api/aree/:areaId/sensori/edit/:sensoreId"
                        element={<EditSensFormWrapper />}
                    />
                    <Route
                        path="api/aree/:areaId/sensori/add"
                        element={<NewSensPageWrapper />}
                    />
                </Route>

                <Route element={<GuardedRoute condition={isManutentore()} redirectRoute="/"/>}>
                    <Route
                        path="api/aree/:areaId/lampioni/guasti"
                        element={<LampGuastiWrapper />}
                    />
                </Route>
                <Route path="" element={<PageFullView />} />
                <Route path="*" element={<NotFoundPage />} />{" "}
                {/* Pagina di fallback per tutte le altre route non corrispondenti */}
            </Routes>
        </Router>
    );
=======
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<GuardedRoute redirectRoute="/login" />}>
          <Route path="api/aree/add" element={<NewAreaPage />} />
          <Route
            path="api/aree/edit/:areaId"
            element={<EditAreaFormWrapper />}
          />
          <Route path="api/aree/:areaId" element={<AreaSingleView />} />
          <Route
            path="api/aree/:areaId/lampioni/:lampioneId"
            element={<LampSingleViewWrapper />}
          />
          <Route
            path="api/aree/:areaId/lampioni/edit/:lampioneId"
            element={<EditLampFormWrapper />}
          />
          <Route
            path="api/aree/:areaId/lampioni/add"
            element={<NewLampPageWrapper />}
          />
          <Route
            path="api/aree/:areaId/sensori/:sensoreId"
            element={<SensSingleViewWrapper />}
          />
          <Route
            path="api/aree/:areaId/sensori/edit/:sensoreId"
            element={<EditSensFormWrapper />}
          />
          <Route
            path="api/aree/:areaId/sensori/add"
            element={<NewSensPageWrapper />}
          />
          <Route
            element={
              <GuardedRoute condition={isManutentore()} redirectRoute="/" />
            }
          >
            <Route
              path="api/aree/:areaId/lampioni/guasti"
              element={<GuastiPageWrapper />} //TODO - Errore "Page not found"
            />
          </Route>
          <Route path="" element={<PageFullView />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* Pagina di fallback per tutte le altre route non corrispondenti */}
      </Routes>
    </Router>
  );
>>>>>>> 29c19a230ce05c45ed538c8ed152006f0610b9c4
};

export default RouterComponent;
