const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')

const router = express.Router()

const {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig,
} = require('./gig.controller')

router.get('/', log, getGigs)
router.get('/:id', getGigById)
router.post('/', requireAuth, addGig)
router.put('/:id', requireAuth, updateGig)
router.delete('/:id', requireAuth, removeGig)

module.exports = router
