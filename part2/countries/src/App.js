import { useEffect, useState } from 'react';
import axios from 'axios';

import FindCountries from './components/FindCountries';
import Results from './components/Results';

function App() {
  const [countryData, setCountryData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [enteredCountry, setEnteredCountry] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const data = response.data;
      setCountryData(data);
      setIsLoading(false);
    });
  }, []);

  const inputHandler = (country) => {
    setEnteredCountry(country);
  };

  if (isLoading) {
    return <p>Please wait while data is fetched</p>;
  }
  return (
    <>
      <FindCountries inputHandler={inputHandler} />
      {isLoading ? (
        ''
      ) : (
        <Results enteredCountry={enteredCountry} countryData={countryData} />
      )}
    </>
  );
}

export default App;
