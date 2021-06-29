import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URI;
console.log(baseURL)
const instance = axios.create({
    baseURL: baseURL,
});

export default instance;
