import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const navigate = useNavigate();

  const getWeather = async () => {
    const apiKey = "a32d21bf3a07496489191426241906";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    setWeather(weatherData.current.temp_c);
    console.log("Weather data:", weatherData.current.temp_c);
  };

  const changePage = () => {
    navigate("/weather");
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="App">
      <div className="main">
        <input
          type="text"
          placeholder="Enter location"
          onChange={handleInputChange}
        />
        <button onClick={getWeather}>Check Weather</button>
        <button onClick={changePage}>Get Full Weather Report</button>
        <h4>{weather ? `Temperature of ${location}: ${weather}°C` : null}</h4>
      </div>
    </div>
  );
}
