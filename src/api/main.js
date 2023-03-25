import axios from "axios"

export const locationFriendly = async(url) => {
    return axios.get(`https://testapi.io/api/tesstlabyo/${url}`)
}

export const gepcodingAPI = async(endpoint, search_text) => {
    return axios.post(`https://api.mapbox.com/geocoding/v5/${endpoint}/${search_text}.json`)
}