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
  const date = new Date(newEntry.date);
  const formattedDate = date.toISOString().slice(0, 10);
  //get time in hh:mm:ss format
  const startTime = new Date(newEntry.startTime).toISOString().slice(11, 19);
  const endTime = new Date(newEntry.endTime).toISOString().slice(11, 19);
  // split time into hours minutes second with destructured array
  const [startHours, startMinutes, startSeconds] = startTime.split(':');
  const [endHours, endMinutes, endSeconds] = endTime.split(':');
  // convert to 24 if PM and not 12
  const formattedStartHour = startHours;
  const formattedEndHour = endHours;
  // turn back into a time string
  const formattedStartTime = `${formattedStartHour}:${startMinutes}:${startSeconds}`;
  const formattedEndTime = `${formattedEndHour}:${endMinutes}:${endSeconds}`;

  // Convert to Date objects
  const startDate = new Date(`1970-01-01T${formattedStartTime}Z`);
  const endDate = new Date(`1970-01-01T${formattedEndTime}Z`);

  //get the difference for start and end time
  const totalHours = (endDate - startDate) / (1000 * 60 * 60);

  newEntry.date = formattedDate;
  newEntry.startTime = formattedStartTime;
  newEntry.endTime = formattedEndTime;
  newEntry.totalHours = totalHours;
  newEntry.employeeId = 1;

  const createdTimeEntry = await knex('time_entries').insert(newEntry);
  return createdTimeEntry;
}

//selects all bookings from the bookings table
exports.findAllTimeEntries = async () => {
	const entries = await knex('time_entries').select('*');
	console.log('time_entries: ', entries);

	const formattedData = entries.map((item) => {
			const date = new Date(item.date);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const formattedDate = `${month}-${day}-${year}`;

			let [hours, minutes] = item.startTime.split(':');
			hours = Number(hours);
			const ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours === 0 ? 12 : hours;
			const formattedStartTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
			//create formatted end time
			let [endHours, endMinutes] = item.endTime.split(':');
			endHours = Number(endHours);
			const endAmpm = endHours >= 12 ? 'PM' : 'AM';
			endHours = endHours % 12;
			endHours = endHours === 0 ? 12 : endHours;
			const formattedEndTime = `${String(endHours).padStart(2, '0')}:${endMinutes} ${endAmpm}`;
			//get the difference for start and end time
			const startTimestamp = new Date(formattedStartTime).getTime();
			const endTimestamp = new Date(formattedEndTime).getTime();
			const hoursDiff = (endTimestamp - startTimestamp) / (1000 * 60 * 60); // Convert milliseconds to hours

			return { ...item, date: formattedDate, startTime: formattedStartTime, endTime: formattedEndTime, totalHours: hoursDiff };
	});

	return formattedData;
};

exports.modifyTimeEntry = async (timeEntryData, id) => {
	// Insert the user into the database and return
	console.log(timeEntryData)
	return await knex('time_entries').update(timeEntryData).where('id', id) // return the data you need
}


