import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../eventbriteService';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h2>{event.name.text}</h2>
            <p>{event.description.text}</p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">View Event</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;