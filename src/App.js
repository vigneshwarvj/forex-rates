import React, { useState, useEffect } from "react";
import "../src/App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = 'https://api.1forge.com/quotes?pairs=EUR/USD,GBP/USD,USD/JPY,AUD/USD,CAD/USD,CHF/USD,NZD/USD,EUR/GBP,EUR/JPY,XAU/USD&api_key=YOUR_API_KEY';  // Insert your API URL here

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);  // Update the state with new data
    } catch (err) {
      setError(err.message);  // Set the error state if there's a failure
    }
  };

  useEffect(() => {
    fetchData();  // Fetch initial data
    const intervalId = setInterval(fetchData, 1000);  // Poll every 10 seconds

    return () => clearInterval(intervalId);  // Cleanup interval on unmount
  }, []);  // Empty dependency array ensures this runs only once on mount

  return (
    <div className="app-container">
      <h1>Forex Rates</h1>
      {error && <p className="error-message">Error: {error}</p>}

      {data ? (
        <div>
          <h2>Exchange Rates</h2>
          <ul className="rate-list">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <li key={item.s} className="rate-item">
                  <span className="pair">{item.s}</span>: 
                  <span className="price">{item.p}</span>
                </li>
              ))
            ) : (
              <p>No data available or incorrect format</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
