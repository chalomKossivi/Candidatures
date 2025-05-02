import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCandidatureForm from "./pages/AddCandidatureForm";
import CandidatureList from "./pages/CandidatureList";
import Statistics from "./pages/statistics";
import Header from "./components/Header";
import Footer from "./components/Footer" ;


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CandidatureList />} />
        <Route path="/statistiques" element={<Statistics />} /> 
        <Route path="/ajouter" element={<AddCandidatureForm />} />
       
      </Routes>
      <AddCandidatureForm />
      <Footer />
    </Router>
  );
};

export default App;
