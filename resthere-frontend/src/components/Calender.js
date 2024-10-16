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

  const fetchUserEntries = async (userID) =>{
    try {
      await axios.get(`http://localhost:5000/api/journal/entries/${userID}`).then(response => {
        const formattedEvents = response.data.map(entry => ({
          title: entry.title,
          start: new Date(entry.date),
          extendedProps: { content: entry.content }
        }));
        setEvents(formattedEvents);
      }); 
    } catch (error) {
      console.error('Error fetching user entries:', error);
    }
  }

  useEffect(()=>{
    if(user.userID){
      // fetch events by user
      fetchUserEntries(user.userID)
    }
  },[user.userID]);

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

