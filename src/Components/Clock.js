import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'

const Clock = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Fetch the list of countries
    axios.get('http://worldtimeapi.org/api/timezone')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));

    // Start the clock
    const intervalId = setInterval(() => {
      if (!isPaused) {
        updateCurrentTime();
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount

  }, [isPaused]);

  const updateCurrentTime = () => {
    if (selectedCountry) {
      axios.get(`https://worldtimeapi.org/api/timezone/${selectedCountry}`)
        .then(response => setCurrentTime(new Date(response.data.utc_datetime)))
        .catch(error => console.error('Error fetching current time:', error));
    } else {
      setCurrentTime(new Date());
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setIsPaused(false);
  };

  const handlePauseToggle = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  return (
    <div className="profile_container">
      <div className="profile_header">
        <div className="country-selector">
          <label htmlFor="countryDropdown">Select Country:</label>
          <select id="countryDropdown" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Local Time</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="clock">
        <p>{currentTime.toLocaleTimeString()}</p>
        <button onClick={handlePauseToggle}>Start / Pause</button>
      </div>
    </div>
  );
};

export default Clock;
