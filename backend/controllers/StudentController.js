const Student = require('../models/StudentModel')
const mongoose = require('mongoose')

// Get all students
const getStudents = async (req, res) => {
    const students = await Student.find({}).sort({ createdAt: -1 })
    res.status(200).json(students)
}

// Get a single student by ID
const getStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    res.status(200).json(student)
}

// Create a new student
const createStudent = async (req, res) => {
  console.log("🚀 ~ createStudent ~ req.body:", req.body)
    const { Name, Mail, Phone, Year } = req.body

    try {
        const student = await Student.create({ Name, Mail, Phone, Year })
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    const student = await Student.findOneAndDelete({ _id: id })

    if (!student) {
        return res.status(400).json({ error: 'Nu au fost gasite rezultate' })
    }

    res.status(200).json(student)
}

// Update a student
const updateStudent = async (req, res) => {
    console.log("updatez...")
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Nu au fost gasite rezultate' })
    }

    const student = await Student.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true }) // Return the updated document

    if (!student) {
        return res.status(400).json({ error: 'Nu au fost gasite rezultate' })
    }

    res.status(200).json(student)
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}
