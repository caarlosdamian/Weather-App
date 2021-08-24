import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const baseUrl = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("Colima");
  const [weather, setWeather] = useState([]);
  const Inputref = useRef("");

  useEffect(() => {
    const res = async () => {
      await axios
        .get(
          `${baseUrl.base}weather?q=${query}&units=metric&appid=${baseUrl.key}`
        )
        .then((res) => {
          console.log(res.data);
          setWeather(res.data);
        });
    };
    res();
  }, [query]);

  const search = (env) => {
    if (env.key === "Enter") {
      setQuery(env.target.value);
      Inputref.current.value = "";
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}  ${date}  ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp >= 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            ref={Inputref}
            type="text"
            className="search-bar"
            placeholder="Search..."
            onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">
            {weather?.name},{weather?.sys?.country}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather?.main?.temp)}°C</div>
          {weather.main ? (
            <div className="weather">{weather?.weather[0]?.main}</div>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
