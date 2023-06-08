import axios from "axios"

export const weatherSearchApi = async (keyword) => {
    const data = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${keyword}`)
    return data
}

export const CoordinateApi = async (keyword) => {
    const data = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${keyword}`)
    return data
}