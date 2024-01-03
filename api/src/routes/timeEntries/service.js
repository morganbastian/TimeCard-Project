const knex = require('../../knex.js')

exports.findTimeEntryById = async (id) => {
	const results = await knex('time_entries').select('*').where('id', id)
	return results
}

// exports.findTimeEntryByEmployeeId = async (employeeId) => {
// 	const results = await knex('time_entries').select('*').where('employeeId', employeeId)
// 	//format the date and time
// 	const formattedData = results.map((result) => {
// 		//put the date from results in a date object
// 		const date = new Date(result.date)
// 		const year = date.getFullYear()
// 		const month = String(date.getMonth() + 1).padStart(2, '0')
// 		const day = String(date.getDate()).padStart(2, '0')
// 		const formattedDate = `${month}-${day}-${year}`
// 		// destructure the array and split at the :
// 		let [hours, minutes] = result.time.split(':')
// 		// convert number to string
// 		let formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
// 		const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`

// 		return {
// 			...result,
// 			date: formattedDate,
// 			time: formattedTime,
// 		}
// 	})

// 	return formattedData
// }

exports.addNewTimeEntry = async (newEntry) => {
	const date = new Date(newEntry.date)
	const formattedDate = date.toISOString().slice(0, 10)
	//get time in hh:mm:ss format
	const startTime = new Date(newEntry.startTime).toISOString().slice(11, 19)
	const endTime = new Date(newEntry.endTime).toISOString().slice(11, 19)
	// split time into hours minutes second with destructured array
	const [startHours, startMinutes, startSeconds] = startTime.split(':')
	const [endHours, endMinutes, endSeconds] = endTime.split(':')
	// convert to 24 if PM and not 12
	const formattedStartHour = startHours
	const formattedEndHour = endHours
	// turn back into a time string
	const formattedStartTime = `${formattedStartHour}:${startMinutes}:${startSeconds}`
	const formattedEndTime = `${formattedEndHour}:${endMinutes}:${endSeconds}`

	// Convert to Date objects
	const startDate = new Date(`1970-01-01T${formattedStartTime}Z`)
	const endDate = new Date(`1970-01-01T${formattedEndTime}Z`)

	//get the difference for start and end time
	const totalHours = (endDate - startDate) / (1000 * 60 * 60)

	newEntry.date = formattedDate
	newEntry.startTime = formattedStartTime
	newEntry.endTime = formattedEndTime
	newEntry.totalHours = totalHours
	newEntry.employeeId = 1

	const createdTimeEntry = await knex('time_entries').insert(newEntry)
	return createdTimeEntry
}

//selects all time entries
exports.findAllTimeEntries = async () => {
	const entries = await knex('time_entries').select('*')

	const formattedData = entries.map((item) => {
		const date = new Date(item.date)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const formattedDate = `${year}-${month}-${day}` // YYYY-MM-DD format

		// Check if startTime and endTime are not null
		if (item.startTime && item.endTime) {
			const formattedStartTime = convertTo24HourFormat(
				item.startTime,
				formattedDate
			)
			const formattedEndTime = convertTo24HourFormat(
				item.endTime,
				formattedDate
			)

			// Calculate time difference
			const startTimestamp = new Date(formattedStartTime).getTime()
			const endTimestamp = new Date(formattedEndTime).getTime()
			const hoursDiff = (endTimestamp - startTimestamp) / (1000 * 60 * 60) // Convert milliseconds to hours

			return {
				...item,
				date: formattedDate,
				startTime: formattedStartTime,
				endTime: formattedEndTime,
				totalHours: hoursDiff,
			}
		} else {
			throw new Error('startTime or endTime is null')
		}
	})

	return formattedData
}

function convertTo24HourFormat(time, date) {
	let hours, minutes, ampm
	const match12Hour = time.match(/(\d+):(\d+)(\sAM|\sPM)/)
	const match24Hour = time.match(/(\d+):(\d+):(\d+)/)

	if (match12Hour) {
		;[hours, minutes, ampm] = match12Hour.slice(1)
		if (ampm.trim() === 'PM' && hours !== '12') {
			hours = (parseInt(hours, 10) + 12).toString()
		} else if (ampm.trim() === 'AM' && hours === '12') {
			hours = '00'
		}
	} else if (match24Hour) {
		;[hours, minutes] = match24Hour.slice(1)
	} else {
		throw new Error(`Invalid time format: ${time}`)
	}

	return `${date}T${hours}:${minutes}:00` // Return in YYYY-MM-DDTHH:MM:SS format
}

exports.modifyTimeEntry = async (timeEntryData, id) => {
	// Insert the user into the database and return
	console.log(timeEntryData)
	return await knex('time_entries').update(timeEntryData).where('id', id) // return the data you need
}
