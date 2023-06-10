import React, { memo, useEffect } from 'react';
import { Box, Flex, Image } from "@chakra-ui/react";
import { getWeatherIcon, getCurrentDay, icons } from "./extend_fun"
const WeatherCard = ({ data }) => {
    const { daily } = data;

    useEffect(() => {
        getCurrentDay()
    }, [data]);

    return (
        <>
            <Flex justifyContent='center' flexWrap="wrap">
                {

                    daily?.weathercode.slice(0, 5).map((item, i) => {
                        return (
                            <Box key={i}>
                                <div className="weather-wrapper">
                                    <div className="weather-card">

                                        <h1><span>{daily.temperature_2m_min[i]}º</span>{daily.temperature_2m_max[i]}º</h1>

                                        <div className="weather-icon">
                                            <Image src={getWeatherIcon(item) ?? icons.default} alt="Weather Icon" />
                                        </div>
                                        <p>{getCurrentDay(i).fiveDaysForecast}</p>
                                        <div className="date">{daily.time[i].substring(5)}</div>
                                    </div>
                                </div>
                            </Box>
                        )
                    })
                }
            </Flex>
        </>
    );
};

export default memo(WeatherCard);
