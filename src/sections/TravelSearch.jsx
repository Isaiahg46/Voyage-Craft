import { useState } from 'react';

const TravelSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a destination name.');
      return;
    }

    const apiUrl = `https://api.example.com/destinations?query=${encodeURIComponent(query)}`;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      setResults(data.destinations || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <div id="search-container" style={{ textAlign: 'center' }}>
        <h2>Search for Travel Destinations</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter destination name"
          style={{ padding: '10px', fontSize: '16px', width: '60%' }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginLeft: '10px'
          }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id="results-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelSearch;
