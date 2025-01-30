const API_URL = 'https://www.eventbrite.com/api/v3';

export const fetchEvents = async () => {
  const response = await fetch(`${API_URL}/events/search/?token=${import.meta.env.VITE_EVENTBRITE_API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};