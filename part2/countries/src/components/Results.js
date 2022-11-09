import { useState, useEffect } from 'react';
import CountryData from './CountryData';

const Results = (props) => {
  const [finalResult, setFinalResult] = useState(false);

  const countryData = props.countryData;

  useEffect(() => {
    setFinalResult(false);
  }, [props.enteredCountry]);

  const showDataHandler = (event) => {
    event.preventDefault();
    const found = countryData.find((country) => country.name.common === event.target.id);
    setFinalResult(found);
  };

  const filteredData = countryData.filter((country) =>
    country.name.common.toUpperCase().includes(props.enteredCountry.toUpperCase())
  );

  const filteredDataName = filteredData.map((filteredCountry) => (
    <div key={filteredCountry.name.common}>
      <span>{filteredCountry.name.common}</span>
      <button id={filteredCountry.name.common} onClick={showDataHandler}>
        Show Data
      </button>
    </div>
  ));

  return (
    <>
      {finalResult ? (
        <CountryData filteredData={finalResult} />
      ) : props.enteredCountry === '' ? (
        ''
      ) : filteredDataName.length > 10 ? (
        'Too many matches, specify another filter'
      ) : filteredDataName.length === 0 ? (
        'No matches found :('
      ) : filteredDataName.length === 1 ? (
        <CountryData filteredData={filteredData[0]} />
      ) : (
        filteredDataName
      )}
    </>
  );
};

export default Results;
