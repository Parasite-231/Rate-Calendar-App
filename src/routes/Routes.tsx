
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import RateCalendarPage from "../pages/RateCalendarPage";
import PageNotFound from "../pages/PageNotFound";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RateCalendarPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
