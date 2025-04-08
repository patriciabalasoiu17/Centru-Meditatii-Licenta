const express = require('express')
const {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent
} = require('../controllers/StudentController')

const router = express.Router()

router.get('/', getStudents)

router.get('/:id', getStudent)

router.post('/', createStudent)

router.delete('/:id', deleteStudent)

router.patch('/:id', updateStudent)

module.exports = router