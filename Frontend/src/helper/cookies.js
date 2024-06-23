import Cookies from 'js-cookie';
import { VITE_COOKIE_TOKEN_KEY, VITE_USER_INFO } from '../env'



const getAccessTokenCookie = () => {
    const storedData = Cookies.get(VITE_COOKIE_TOKEN_KEY);
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (error) {
            return storedData;
        }
    }
};

const removeAccessTokenCookie = () => {
    Cookies.remove(VITE_COOKIE_TOKEN_KEY);
    window.location.reload()
};

const setAccessTokenCookie = (token,) => {
    const objectString = JSON.stringify(token);
    Cookies.set(VITE_COOKIE_TOKEN_KEY, objectString);
};

const setAdminValueCookies = (value) => {

    const objectString = JSON.stringify(value);
    Cookies.set(VITE_USER_INFO, objectString);
};

const getAdminValueCookies = () => {

    const storeData = Cookies.get(VITE_USER_INFO);
    if (storeData) {
        try {
            return JSON.parse(storeData);
        } catch (error) {
            return null;
        }
    }
};

export { getAccessTokenCookie, removeAccessTokenCookie, setAccessTokenCookie, setAdminValueCookies, getAdminValueCookies };
