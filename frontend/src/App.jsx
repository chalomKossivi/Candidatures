import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCandidatureForm from "./pages/AddCandidatureForm";
import CandidatureList from "./pages/CandidatureList";
import Header from "./components/Header";
import Footer from "./components/Footer" ;


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CandidatureList />} />
        <Route path="/ajouter" element={<AddCandidatureForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
