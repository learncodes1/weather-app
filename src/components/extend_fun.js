import weatherData from "./data";

export const icons = {
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

const currentDate = new Date();

export const getWeatherIcon = (weathercode) => {
    if (weathercode >= 0 && weathercode <= 2) {
        return icons.sun;
    } else if (weathercode >= 3 && weathercode <= 19) {
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

export const getMessage = (weathercode) => {

    return weatherData[weathercode] || '';
};

export const getCurrentDay = (index) => {
    const nextFiveDays = [];

    for (let i = 0; i < 45; i++) {
        const date = new Date(currentDate.getTime());
        date.setDate(date.getDate() + i);
        nextFiveDays.push(date.toDateString());
    }


    const currentDayIndex = currentDate.getDay();


    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });


    const date = currentDate.getDate();


    const time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });


    const year = currentDate.getFullYear();


    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fiveDaysForecast = days[(currentDayIndex + index) % days.length]

    return {
        day,
        date,
        time,
        month,
        year,
        fiveDaysForecast,
        nextFiveDays
    };
}