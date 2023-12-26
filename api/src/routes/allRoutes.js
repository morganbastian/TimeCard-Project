const { Router } = require('express')

// import routes
const root = require('./root/router')
const timeEntries = require('./timeEntries/router')
// create a new Router instance
const allRouters = new Router()
// create base routes
allRouters.use('/', root)
allRouters.use('/timeEntries', timeEntries)
// exporting router
module.exports = allRouters