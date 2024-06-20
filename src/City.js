// City.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App";

export const City = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "a32d21bf3a07496489191426241906";
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("City not found");
        }
        const weatherData = await response.json();
        setWeather(weatherData.current);
      } catch (err) {
        setError(err.message);
      }
    };
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div className="city-container">
      <h1>Weather Report for {city}</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        weather && (
          <div className="weather-info">
            <h4>Temperature: {weather.temp_c}°C</h4>
            <h4>Condition: {weather.condition.text}</h4>
            <h6>Humidity: {weather.humidity}%</h6>
            <h6>Wind Speed: {weather.wind_kph} kph</h6>
            <h6>Feels Like: {weather.feelslike_c}°C</h6>
            <h6>Last Updated: {weather.last_updated}</h6>
          </div>
        )
      )}
    </div>
  );
};
