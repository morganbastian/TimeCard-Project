require('dotenv').config()

const {
	findTimeEntryById,
	findTimeEntryByEmployeeId,
	addNewTimeEntry,
	findAllTimeEntries,
	modifyTimeEntry
} = require('./service')

exports.showTimeEntryById = async (req, res) => {
	try {
		// Only allow admins and account owners to access the user data
		const foundTimeEntry = await findTimeEntryById(req.params.id)

		if (!foundTimeEntry) {
			return res.status(404).json('No Entry Found')
		}

		return res.json(foundTimeEntry)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showTimeEntryByEmployeeId = async (req, res) => {
	try {
		// Only allow admins and account owners to access the user data
		const foundTimeEntry = await findTimeEntryByEmployeeId(req.params.userId)

		if (!foundTimeEntry) {
			return res.status(404).json('No Entry Found')
		}

		return res.json(foundTimeEntry)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}
exports.createNewTimeEntry = async (req, res) => {
	try {
		const newTimeEntry = req.body
		const entry = await addNewTimeEntry(newTimeEntry)
		return res.json(entry)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showAllTimeEntries = async (req, res) => {
	try {
		const allTimeEntries = await findAllTimeEntries(req.params)
		console.log('allTimeEntries: ', allTimeEntries)
		return res.json(allTimeEntries)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.updateTimeEntry = async (req, res) => {
	const timeEntryId = req.params.id
	const newTimeEntryData = req.body
	const updatedTimeEntry = await modifyTimeEntry(
			newTimeEntryData,
			timeEntryId
		)
		return res.json(updatedTimeEntry)
	
}

	