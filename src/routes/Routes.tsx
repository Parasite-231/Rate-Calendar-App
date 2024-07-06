import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import RateCalendarLayout from "../components/RateCalendarLayout";
import PageNotFound from "../pages/PageNotFound";
import RateCalendarPage from "../pages/RateCalendarPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RateCalendarPage />} />
        <Route path="/demo" element={<RateCalendarLayout />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
