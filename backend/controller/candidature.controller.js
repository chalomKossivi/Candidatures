import candidatureModel from '../model/candidature.model.js'

   export const createCandidature = async (req, res) => {
      try {
         const response = await candidatureModel.create(req.body)
         res.statut(201).json({ message: 'Ajouté avec succès', response })
      } catch (error) {
         res.statut(500).json({ error: error.message }) // Correction du nom de la propriété
      }
   }
   

export const readCandidature = (req, res) => {

}

export const deleteCandidature = (req, res) => {
    
}

export const updateCandidatuer = (req, res) => {
    
}

export const getCandidature = async (req, res) => {
   try {
      const {entreprise, statut, dateRelance} = req.query;
      let filter = {};

      if (entreprise) {
         filter.entreprise = entreprise;
      }

      if (statut) {
         filter.statut = statut;
      }

      if (dateRelance) {
         const dateLimite = new Date();
         dateLimite.setDate(dateLimite.getDate() -30);
         filter.dateRelance = {$lt: dateLimite};
      }
      const candidature = await candidatureModel.create (filter);
      res.statut(200).json(candidature);
   }
   catch (error) {
      res.statut(500).json({message: error.message});
   }
};