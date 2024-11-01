import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { useSelector } from 'react-redux';

import '../css/Journal.css';

export function Calender({ onEventClick }) {
  const user = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);

  const fetchUserEntries = async (userID) => {
    try {
      const response = await axios.get(`/api/journal/entries/${userID}`);
      const formattedEvents = response.data.map(entry => ({
        id: entry._id, // Ensure the event has an ID to identify it
        title: entry.title,
        start: new Date(entry.date).toISOString().split('T')[0],
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching user entries:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (user.userID) {
      fetchUserEntries(user.userID);
    }
  }, [user.userID]);

  const handleEventClick = (eventInfo) => {
    onEventClick(eventInfo.event.id); 
  };

  return (
    <div className='calender-con'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventClick={handleEventClick} 
      />
    </div>
  );
}

export default Calender;
