import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const CountryData = (props) => {
  const [weatherData, setWeatherData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { name, capital, area, languages, flags, capitalInfo } = props.filteredData;
  const api_key = process.env.REACT_APP_API_KEY;
  const lat = capitalInfo.latlng[0];
  const lng = capitalInfo.latlng[1];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
      )
      .then((response) => {
        const data = response.data;
        setWeatherData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1>{name.common}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {area}</div>
      <h2>Languages:</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`The flag of ${name.common}`} />
      <h2>{`Weather in ${capital}`}</h2>
      {isLoading ? '' : <Weather weatherData={weatherData} />}
    </>
  );
};

export default CountryData;
