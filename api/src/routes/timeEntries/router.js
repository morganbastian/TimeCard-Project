const { Router } = require('express')
const { showTimeEntryById, showTimeEntryByEmployeeId, createNewTimeEntry, showAllTimeEntries, updateTimeEntry } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes
router.get('/:id', showTimeEntryById)
router.post('/new', createNewTimeEntry)
router.get('/', showAllTimeEntries)
router.get('/id/:employeeId', showTimeEntryByEmployeeId)
router.put('/update/:id', updateTimeEntry)


// exporting router
module.exports = router