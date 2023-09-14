import React, { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers'
//** Setup (define helper functions and variables here)

function Home(props) {
  //** Destructure Props
  const {

  } = props

  //** State Variables
  const [date, setDate] = useState('')
  //** Component Logic

  //** Return JSX
  return (
    <div> 
      <LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateCalendar
					value={date}
					required
					onChange={(date) => setDate(date)}
				/>
			</LocalizationProvider>
    </div>
  )
}
export default Home