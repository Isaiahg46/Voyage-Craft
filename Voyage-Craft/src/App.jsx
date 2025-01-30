import React, { useState } from 'react';
import SearchBar from './SearchBar';

const App = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async (query) => {
        const response = await fetch(`https://www.eventbrite.com/api/v3/events/search/?q=${query}&token=MPCKUB5O5LDUKEAIJBRW`);
        const data = await response.json();
        setEvents(data.events);
    };

    return (
        <div>
            <h1>Eventbrite Event Search</h1>
            <SearchBar onSearch={fetchEvents} />
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

export default App;