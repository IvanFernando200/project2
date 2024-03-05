import React, { useState } from "react";
import "./styles/WeatherCard.css";
const WeatherCard = ({ weather, temp }) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  return (
    <article className="weather">
      <header className="weather__header">
        <h1 className="weather__title">Weather App</h1>

        <p className="weather__country">
          {weather?.name}, {weather?.sys.country}
        </p>
      </header>
      <section className="weather__resource">
        <img
          className="weather__image"
          src={
            weather &&
            ` https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
          }
          alt={`${weather?.weather[0].main} icon`}
        />
      </section>
      <section className="weather__main">
        <h2 className="weather__description">"{weather?.weather[0].description}"</h2>
        <ul className="weather__list">
          <li className="weather__item">
            <span className="weather__label">Wind Speed: </span>
            <span className="weather__value">{weather?.wind.speed} m/s</span>
          </li>
          <li className="weather__item">
            <span className="weather__label">Clouds: </span>
            <span className="weather__value">{weather?.clouds.all} %</span>
          </li>
          <li className="weather__item">
            <span className="weather__label">Humity: </span>
            <span className="weather__value">{weather?.main.humidity} %</span>
          </li>
          <li className="weather__item">
            <span className="weather__label">Pressure: </span>
            <span className="weather__value">{weather?.main.pressure} hPa</span>
          </li>
        </ul>
      </section>
      <footer className="weather__footer">
        <h2 className="weather__temp">
          {isFahrenheit ? `${temp?.fahrenheit} °F` : `${temp?.celcious} °C`}
        </h2>
        <button
          className="weather__button"
          onClick={() => setIsFahrenheit(!isFahrenheit)}
        >
          Change to {isFahrenheit ? "°C" : "°F"}
        </button>
      </footer>
    </article>
  );
};

export default WeatherCard;
