import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import { Box, Button, Typography } from '@mui/material';
import { createNewTimeEntry, getTimeEntryById, updateTimeEntry, getAllTimeEntries} from '../../utility/api';

function Home(props) {
  // State Variables
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);

useEffect(() => {
  //get all time entries data
  const getAllTimeEntriesData = async () => {
    const response = await getAllTimeEntries();
    console.log('response:' ,response);
  };
  getAllTimeEntriesData();
}, []);

  //create a new time entry on submit
const handleSubmit = async () => {
  
  const startTimestamp = new Date(startTime).getTime();
  const endTimestamp = new Date(endTime).getTime();
  const hoursDiff = (endTimestamp - startTimestamp) / (1000 * 60 * 60); // Convert milliseconds to hours

    const timeEntryData = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      totalHours: hoursDiff,
    };
    try {
      const response = await createNewTimeEntry(timeEntryData);
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }
    //reset all fields on reset
const handleReset = () => {
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setTotalHours(0);
  }


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          value={date}
          required
          onChange={(date) => setDate(date)}
        />
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          height="20vh"
        >
          <TimePicker 
            label="Start Time" 
            value={startTime} 
            onChange={(time) => setStartTime(time)} 
          />
          <TimePicker 
            label="End Time" 
            value={endTime}
            onChange={(time) => setEndTime(time)}
            sx={{margin: 2}}
          />
        </Box>
      </LocalizationProvider>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh'}} variant="h6">
          Accumulated Total Hours: {totalHours.toFixed(2)}
        </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button variant="contained" color="primary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Home;

