import axios from "axios"

export const weatherSearchApi = async (keyword) => {
    const data = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${keyword}`)
    return data
}

export const CoordinateApi = async (lati,lng) => {
    const data = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${lng}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=GMT`)
    return data
}