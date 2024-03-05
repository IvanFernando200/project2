import { useRef } from "react";
import "./styles/FormWeatherCard.css";

const FormWeatherCard = ({ setCity }) => {
  const newCity = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(newCity.current.value);
    newCity.current.value = null;
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="weather">
        Search another city's weather
      </label>
      <input
        className="form__input"
        ref={newCity}
        type="text"
        placeholder="Inset the city"
        id="weather"
        required
      />
      <button className="form__btn">Search</button>
    </form>
  );
};

export default FormWeatherCard;
