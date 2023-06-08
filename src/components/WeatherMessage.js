import React from 'react';
import { weatherData } from './weatherData';

const WeatherMessage = ({ weatherCode }) => {
  const message = weatherData[weatherCode] || 'Weather information not available';

  return <div>{message}</div>;
};

export default WeatherMessage;
