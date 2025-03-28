import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandidaturesPage from "./pages/CandidaturesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidaturesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
