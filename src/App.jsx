import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import Loading from "./components/Loading";
import FormWeatherCard from "./components/FormWeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState();

  // 1) Get latitue & longitude using geolocation API and save in the coords state
  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };
  const error = (err) => {
    setCoords({
      lat: 40.73061,
      lon: -73.935242,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (city) {
      const url = `https://api.api-ninjas.com/v1/city?name=${city}`;
      axios
        .get(url, {
          headers: { "X-Api-Key": "xYtGACsXqouwgpQnsCiV0A==oFAGRKqZAnMkq1WE" },
          contentType: "application/json",
        })
        .then((res) => {
          console.log(res.data);
          setCoords({
            lat: res.data[0].latitude,
            lon: res.data[0].longitude,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [city]);

  // 2) Use the before resource to get the weather by an axios petition and save in the weather state
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

  // 3) temp state was made to save the conversion temperature in celcious and fahrenheit.
  // 4) isLoading state was made to don't show my card befere complete the charge.
  return (
    <div className="app">
      {isLoading ? <Loading /> : <WeatherCard weather={weather} temp={temp} />}
      <FormWeatherCard setCity={setCity} />
    </div>
  );
}

export default App;
