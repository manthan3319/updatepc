import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'; // Assuming you have a CSS file for the styles

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Saidbar = lazy(() => import('./components/Saidbar/Saidbar'));
const Festivalpost = lazy(() => import('./components/Festivalpost/Festivalpost.js'));
const CreateFestivalpost = lazy(() => import('./components/Festivalpost/CreateFestivalpost/CreateFestivalpost.js'));
const CreateOneFestivalpost = lazy(() => import('./components/Festivalpost/CreateFestivalpost/CreateOneFestivalpost.js'));

const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="loading bg-[#1c1c24]">Nextgenn...</div>}>
        <div className="app-container">
          <Saidbar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Festivalpost" element={<Festivalpost />} />
              <Route path="/CreateFestivalpost" element={<CreateFestivalpost />} />
              <Route path="/CreateOneFestivalpost" element={<CreateOneFestivalpost />} />
            </Routes>
          </div>
        </div>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
