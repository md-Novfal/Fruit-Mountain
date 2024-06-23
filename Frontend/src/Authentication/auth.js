import { getAccessTokenCookie, removeAccessTokenCookie } from '../helper/cookies';
import { VITE_REDIRECT_URL } from '../env'
export const onLogout = () => {
    removeAccessTokenCookie();

    window.location.reload();
    window.location.href = VITE_REDIRECT_URL;

};

export const isLoggedIn = () => {
    const accessToken = getAccessTokenCookie();
    return !!accessToken;
};
