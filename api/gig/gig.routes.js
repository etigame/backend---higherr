const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')

// middleware that is specific to this router
router.use(requireAuth)
const {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig,
} = require('./gig.controller')
const router = express.Router()

router.get('/', log, getGigs)
router.get('/:id', getGigById)
router.post('/', requireAuth, addGig)
router.put('/:id', requireAuth, updateGig)
router.delete('/:id', requireAuth, removeGig)

module.exports = router
