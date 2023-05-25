import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LampsFullView } from '../components/LampsFullView';

export const RouterComponent : React.FC = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" Component={LampsFullView}/>
            </Routes>
        </Router>
    )
}