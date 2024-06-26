
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RateCalendarPage from "../pages/RateCalendarPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RateCalendarPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
