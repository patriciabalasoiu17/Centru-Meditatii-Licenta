const express = require('express')
const {
    createMeditatie,
    getMeditatii,
    getMeditatie,
    deleteMeditatie,
    updateMeditatie
} = require('../controllers/meditatieController')

const router = express.Router()

router.get('/', getMeditatii)

router.get('/:id', getMeditatie)

router.post('/', createMeditatie)

router.delete('/:id', deleteMeditatie)

router.patch('/:id', updateMeditatie)

module.exports = router