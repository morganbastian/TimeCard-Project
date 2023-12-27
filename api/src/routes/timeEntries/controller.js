require('dotenv').config()

const {
	findAllBookings,
	findBookingById,
	findBookingByUserId,
	modifyBooking,
	destroyBooking,
	addNewBooking,
} = require('./service')

exports.showBookingById = async (req, res) => {
	try {
		// Only allow admins and account owners to access the user data
		const foundBooking = await findBookingById(req.params.id)

		if (!foundBooking) {
			return res.status(404).json('No User Found')
		}

		return res.json(foundBooking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showBookingByUserId = async (req, res) => {
	try {
		// Only allow admins and account owners to access the user data
		const foundBooking = await findBookingByUserId(req.params.userId)

		if (!foundBooking) {
			return res.status(404).json('No User Found')
		}

		return res.json(foundBooking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}
exports.createNewBooking = async (req, res) => {
	try {
		const newBooking = req.body
		const booking = await addNewBooking(newBooking)
		return res.json(booking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showAllBookings = async (req, res) => {
	try {
		const allBookings = await findAllBookings(req.params)
		console.log('allBookings: ', allBookings)
		return res.json(allBookings)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.updateBooking = async (req, res) => {
	const bookingId = req.params.id
	const newBookingData = req.body
	console.log('user', req.user)
	try {
		const bookingData = await findBookingById(bookingId)

		// Only allow users to edit their own reports unless the user is an admin
		if (req.user.id !== bookingData.userId && req.user.role !== 'admin') {
			return res
				.status(403)
				.json({ error: 'You do not have permission to access this resource' })
		}

		const updatedBooking = await modifyBooking(
			newBookingData,
			bookingId
		)
		return res.json(updatedBooking)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

	