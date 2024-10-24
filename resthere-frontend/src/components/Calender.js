import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios';
import { useSelector } from 'react-redux';

import '../css/Journal.css';

const events = [
  { title: ' Journal Entry', start: new Date() }
]

export function Calender() {
  // get user info
  const user = useSelector((state) => state.user);

  const [events, setEvents] = useState([]);

  const fetchUserEntries = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/journal/entries/${userID}`);
      console.log(response);
      
    // Format the response data to match the FullCalendar event structure
    const formattedEvents = response.data.map(entry => ({
      title: entry.title, 
      // Convert to ISO format (YYYY-MM-DD)
      start: new Date(entry.date).toISOString().split('T')[0], 
      
    }));

    console.log(formattedEvents)
    setEvents(formattedEvents);

    } catch (error) {
      console.error('Error fetching user entries:', error.response ? error.response.data : error.message);
      console.error('Request Config:', error.config);
    }
  }

  useEffect(() => {
    if (user.userID) {  
      console.log('Fetching entries for userID:', user.userID); // Add this
      fetchUserEntries(user.userID);
    }
  }, [user.userID]);
  

  return (
    <div className='calender-con'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}


// a custom render function
function renderEventContent(eventInfo) {
    return (
      <>
        {/* <b>{eventInfo.timeText}</b> */}
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

export default Calender;

