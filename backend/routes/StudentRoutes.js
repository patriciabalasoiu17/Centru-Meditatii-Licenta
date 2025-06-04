import express from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent
} from '../controllers/StudentController.js';

const router = express.Router();

router.get('/', getStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);
router.patch('/:id', updateStudent);

export default router;
