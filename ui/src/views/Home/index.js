import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import { Box, Button, Typography } from '@mui/material';

function Home(props) {
  // State Variables
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [runningTotalHours, setRunningTotalHours] = useState(0);

  function calculateHoursBetween(start, end) {
    if (start && end) {
      const difference = end - start; // in milliseconds
      return difference / (1000 * 60 * 60); // Convert to hours
    }
    return 0;
  }

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    const storedStartTime = localStorage.getItem('startTime');
    const storedEndTime = localStorage.getItem('endTime');
  
    if (storedDate) {
      setDate(new Date(storedDate));
    }
  
    if (storedStartTime) {
      setStartTime(new Date(storedStartTime));
    }
  
    if (storedEndTime) {
      setEndTime(new Date(storedEndTime));
    }

    const storedTotalHours = localStorage.getItem('runningTotalHours');
    if (storedTotalHours) {
      setRunningTotalHours(parseFloat(storedTotalHours));
    }
  }, []);
  
  function handleReset() {
    // Clear the values in local storage
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('startTime');
    localStorage.removeItem('endTime');
    localStorage.removeItem('runningTotalHours');

    // Reset the runningTotalHours state
    setRunningTotalHours(0);
  }


  function handleSubmit() {
    if (date) {
      localStorage.setItem('selectedDate', date.toISOString());
    }

    if (startTime) {
      localStorage.setItem('startTime', startTime.toISOString());
    }

    if (endTime) {
      localStorage.setItem('endTime', endTime.toISOString());
    }
    

    // Calculate hours for the current selection
    const hours = calculateHoursBetween(startTime, endTime);

    // Add current selection's hours to the running total
    const newTotalHours = runningTotalHours + hours;
    setRunningTotalHours(newTotalHours);

    // Store the new total hours to local storage
    localStorage.setItem('runningTotalHours', newTotalHours.toString());
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
          Accumulated Total Hours: {runningTotalHours.toFixed(2)}
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

