import axios from "axios";

const API_URL = "http://localhost:5000/candidatures";

export const fetchCandidatures = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur de données des candidatures", error);
    return [];
  }
};

export const addCandidature = async (candidature) => {
  try {
    await axios.post(API_URL, candidature);
  } catch (error) {
    console.error("Erreur pour ajouter des candidatures", error);
  }
};
