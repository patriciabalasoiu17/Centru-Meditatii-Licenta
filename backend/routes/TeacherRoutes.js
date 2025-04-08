const express = require('express')
const {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher
} = require('../controllers/TeacherController')

const router = express.Router()

router.get('/', getTeachers)

router.get('/:id', getTeacher)

router.post('/', createTeacher)

router.delete('/:id', deleteTeacher)

router.patch('/:id', updateTeacher)

module.exports = router