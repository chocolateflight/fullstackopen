import React, { useRef } from 'react';

const FindCountries = (props) => {
  const inputCountryRef = useRef();
  
  const searchHandler = () => {
    const enteredCountry = inputCountryRef.current.value;
    props.inputHandler(enteredCountry)
  }

  return (
    <form>
      <div>
        find countries: <input type="text" ref={inputCountryRef} onChange={searchHandler} />
      </div>
    </form>
  );
};

export default FindCountries;
