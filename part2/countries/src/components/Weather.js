const Weather = (props) => {
  return (
    <>
      <div>Temperature: {(props.weatherData.main.temp - 273.15).toFixed(2)} Celsius</div>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`}
          alt='weather icon'
        />
      </div>
      <div>Wind: {props.weatherData.wind.speed} m/s</div>
    </>
  );
};

export default Weather;
