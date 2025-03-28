import ModelCandidature from '../models/candidature.model.js'

export const createCandidature = async (req, res) => {
  try {    
    const response = await ModelCandidature.create(req.body)
    res.status(201).json({ message: 'a été ajouté', response })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const readCandidature = async (req, res) => {
  try {
    const response = await ModelCandidature.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)

  }
}

export const deleteCandidature = (req, res) => {
  
}

export const updateCandidature = (req, res) => {
  
}