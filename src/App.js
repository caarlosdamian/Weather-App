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
    axios
      .get(
        `${baseUrl.base}weather?q=${query}&units=metric&appid=${baseUrl.key}`
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, []);

  const search = (env) => {
    if (env.key === "Enter") {
      axios
        .get(
          `${baseUrl.base}weather?q=${query}&units=metric&appid=${baseUrl.key}`
        )
        .then((res) => {
          console.log(res.data);
          setQuery("");
          Inputref.current.value = "";
          setWeather(res.data);
        });
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
    <div className="app">
      <main>
        <div className="search-box">
          <input
            ref={Inputref}
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">New York City, US</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">15 C</div>
          <div className="weather">Sunny</div>
        </div>
      </main>
    </div>
  );
}

export default App;
