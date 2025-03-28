import React, { useState } from "react";
import AddCandidatureForm from "../src/components/AddCandidatureForm";
import CandidatureList from "../src/components/CandidatureList";

const CandidaturesPage = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshList = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Gestion des Candidatures</h1>
      <AddCandidatureForm onAdd={refreshList} />
      <CandidatureList key={refresh} />
    </div>
  );
};

export default CandidaturesPage;