import axios from "axios";
import { getAccessTokenCookie } from "../helper/cookies";
import { VITE_SERVER_URL } from '../env'

const baseUrl = VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "token": getAccessTokenCookie(),
    }
});


export default axiosInstance;
