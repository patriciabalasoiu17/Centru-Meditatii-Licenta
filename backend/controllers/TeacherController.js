const Teacher = require('../models/TeacherModel')
const mongoose = require('mongoose')


const getTeachers = async (req, res) => {
    const teachers = await Teacher.find({}).sort({ createdAt: -1 })
    res.status(200).json(teachers)
}


const getTeacher = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    const teacher = await Teacher.findById(id)

    if (!teacher) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    res.status(200).json(teacher)
}


const createTeacher = async (req, res) => {
  console.log("🚀 ~ createTeacher ~ req.body:", req.body)
    const { Name, Mail, Phone, Subject } = req.body

    try {
        const teacher = await Teacher.create({ Name, Mail, Phone, Subject })
        res.status(200).json(teacher)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const deleteTeacher = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    const teacher = await Teacher.findOneAndDelete({ _id: id })

    if (!teacher) {
        return res.status(400).json({ error: 'Nu au fost gasite rezultate' })
    }

    res.status(200).json(teacher)
}


const updateTeacher = async (req, res) => {
    console.log("updatez...")
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    const teacher = await Teacher.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    if (!teacher) {
        return res.status(400).json({ error: 'Nu au fost gasite rezultate' })
    }

    res.status(200).json(teacher)
}

module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher
}
