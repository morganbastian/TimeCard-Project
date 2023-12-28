const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000'


export const createNewTimeEntry = async (timeEntryData) => {
  try {
    const response = await fetch(`${baseUrl}/timeEntries/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timeEntryData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createNewTimeEntry: ", error);
    throw error;  // Re-throw to allow the calling component to handle it
  }
};

export const getTimeEntryById = async (id) => {
	const response = await fetch(`${baseUrl}/timeEntries/${id}`, {
		method: 'GET',
	})

	const responseData = await response.json()
	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const getTimeEntryByEmployeeId = async (employeeId) => {
	const response = await fetch(`${baseUrl}/timeEntries/id/${employeeId}`, {
		method: 'GET',
	})

	const responseData = await response.json()
	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const updateTimeEntry = async (data) => {
	console.log(data)
	const response = await fetch(`${baseUrl}/timeEntries/update/${data.id}`, {
		method: 'PUT',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify(data),
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw new Error(
			`Status Code: ${response?.status} - ${responseData?.message}`
		)
	}

	return responseData
}

export const getAllTimeEntries = async () => {
	const response = await fetch(`${baseUrl}/timeEntries/`)
	const responseData = await response.json()
	return responseData
}



