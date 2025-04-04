const Meditatie = require('../models/MeditatieModel')
const mongoose = require('mongoose')

const getMeditatii = async (req, res) => {
    const meditatii = await Meditatie.find({}).sort({createdAt: -1})

    res.status(200).json(meditatii)
}


const getMeditatie = async (req, res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Nu au fost gasite rezultate'})
    }
    const meditatie = await Meditatie.findById(id)

    if (!meditatie){
        return res.status(404).json({error: 'Nu au fost gasite rezultate'})
    }

    res.status(200).json(meditatie)
}

const createMeditatie = async (req, res) =>{
    const {Subject, Date, Duration} = req.body

    try {
      const meditatie = await Meditatie.create({Subject, Date, Duration})
      res.status(200).json(meditatie)
    } catch (error) {
        res.status(400).json({error: error.message})
    }  
}


const deleteMeditatie = async(req, res) =>{
  const { id } = req.params


  if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Nu au fost gasite rezultate'})
  }

  const meditatie = await Meditatie.findOneAndDelete({_id: id})

  if (!meditatie){
     return res.status(400).json({error: 'Nu au fost gasite rezultate'})
  }

  res.status(200).json(meditatie)

}

const updateMeditatie = async(req, res) => {
    const { id } = req.params


  if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Nu au fost gasite rezultate'})
  }

  const meditatie = await Meditatie.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!meditatie){
    return res.status(400).json({error: 'Nu au fost gasite rezultate'})
 }

 res.status(200).json(meditatie)
 
}


 module.exports = {
    getMeditatii,
    getMeditatie,
    createMeditatie,
    deleteMeditatie,
    updateMeditatie
 }