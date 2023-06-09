import React, { memo, useEffect, useState } from 'react';
import { CoordinateApi } from '../utils/api';
import { Image } from "@chakra-ui/react";
import weatherData from "./data";

const WeatherCard = ({ data }) => {
    const { lat, lng, name } = data;
    const [coordinateData, setCoordinateData] = useState('');

        const { latitude, longitude, current_weather, daily } = coordinateData;


    // if (coordinateData !== undefined) {
    // const { temperature_2m_max, temperature_2m_min, time, weathercode } = daily
    // console.log(weathercode,"weathercode")
    // }

    const fetchCoordinateData = async () => {
        if (lat && lng && name) {
            try {
                const { data } = await CoordinateApi(lat, lng);
                setCoordinateData(data);
            } catch (error) {
                console.log(error);
            }
        }
    };


    useEffect(() => {
        fetchCoordinateData();
    }, [lat, lng, name]);

    const getWeatherIcon = (weathercode) => {
        if (weathercode >= 0 && weathercode <= 3) {
            return icons.sun;
        } else if (weathercode >= 4 && weathercode <= 19) {
            return icons.cloud;
        } else if (
            (weathercode >= 20 && weathercode <= 21) ||
            (weathercode >= 25 && weathercode <= 29) ||
            (weathercode >= 50 && weathercode <= 59) ||
            (weathercode >= 68 && weathercode <= 69) ||
            (weathercode >= 80 && weathercode <= 99)
        ) {
            return icons.drizzle_rainfall;
        } else if (weathercode === 22 || weathercode === 23 || weathercode === 24 || weathercode === 26) {
            return icons.snow_fall;
        } else if (weathercode === 29 || weathercode === 57) {
            return icons.heavy_rain;
        } else if (weathercode >= 30 && weathercode <= 39) {
            return icons.storm;
        } else if (weathercode >= 40 && weathercode <= 49) {
            return icons.fog;
        } else if (weathercode >= 60 && weathercode <= 66) {
            return icons.rain;
        } else if (weathercode >= 70 && weathercode <= 79) {
            return icons.snow;
        } else {
            return '';
        }
    };

    const getMessage = (weathercode) => {
        return weatherData[weathercode] || '';
    };

    const icons = {
        sun: 'https://cdn-icons-png.flaticon.com/512/979/979585.png',
        cloud: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
        snow_fall: 'https://cdn-icons-png.flaticon.com/512/2140/2140176.png',
        heavy_rain: 'https://cdn-icons-png.flaticon.com/512/9579/9579403.png',
        drizzle_rainfall: 'https://cdn-icons-png.flaticon.com/512/10591/10591864.png',
        storm: 'https://cdn-icons-png.flaticon.com/512/8765/8765969.png',
        fog: 'https://cdn-icons-png.flaticon.com/512/3750/3750506.png',
        rain: 'https://cdn-icons-png.flaticon.com/512/9579/9579403.png',
        snow: 'https://cdn-icons-png.flaticon.com/512/2140/2140176.png',
        default: "https://cdn-icons-png.flaticon.com/512/1888/1888282.png"
    };


    // const weatherIcon = getWeatherIcon(weathercode);
    // const message = getMessage(weathercode);

    return (
        <>
            {
                // weathercode.slice(0, 5).map((item,i) => {
                //     console.log(item)

                // })
            }
            <div className="weather-wrapper">
                <div className="weather-card">

                    <h1>26º</h1>
                    <div className="weather-icon">
                        <Image src={getWeatherIcon(1) ?? icons.default} alt="Weather Icon" />
                    </div>
                    <p>{name}</p>
                    <p>{getMessage(1)}</p>
                </div>
            </div>
        </>
    );
};

export default memo(WeatherCard);
