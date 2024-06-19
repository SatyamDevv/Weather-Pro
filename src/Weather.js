import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Weather = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState("");
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
        setWeather(weatherData.current.temp_c);
      } catch (err) {
        setError(err.message);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div>
      <h1>Weather Report</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <h4>{weather ? `Temperature of ${city}: ${weather}°C` : "Loading..."}</h4>
      )}
    </div>
  );
};
