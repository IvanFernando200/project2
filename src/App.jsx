import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import Loading from "./components/Loading";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (position) => {
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIKEY = "229be110990b431587e01a6899f2e98c";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;
      axios(url)
        .then((res) => {
          setWeather(res.data);
          const celcious = (res.data.main.temp - 273.15).toFixed(2);
          const fahrenheit = ((celcious * 9) / 5 + 32).toFixed(2);
          setTemp({
            celcious,
            fahrenheit,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [coords]);

  return (
    <div className="app">
      {isLoading ? <Loading /> : <WeatherCard weather={weather} temp={temp} />}
    </div>
  );
}

export default App;
