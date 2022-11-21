import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = (country) => {
  const [countryData, setCountryData] = useState();

  const fetchData = async (country) => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );

    console.log(response.data[0]);
    const { name, capital, population, flags } = response.data[0];

    setCountryData({
      name,
      capital,
      population,
      flags,
    });
  };

  useEffect(() => {
    if (country) {
      fetchData(country);
    }
  }, [country]);

  return countryData;
};
