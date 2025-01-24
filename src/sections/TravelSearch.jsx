import { useState } from 'react';

function TravelSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setResults(data.destinations || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <div id="search-container" style={{ textAlign: 'center' }}>
        <h1>Search for Travel Destinations</h1>
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
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
      <div id="results-container" style={{ marginTop: '20px' }}>
        <h2>Results:</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div id="results">
          {results.length > 0 ? (
            results.map((destination, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <p>
                  <strong>Country:</strong> {destination.country}
                </p>
              </div>
            ))
          ) : (
            !loading && <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TravelSearch;
