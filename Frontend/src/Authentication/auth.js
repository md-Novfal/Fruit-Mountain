import { getAccessTokenCookie, removeAccessTokenCookie } from '../helper/cookies';

export const onLogout = () => {
    removeAccessTokenCookie();

    window.location.reload();

    window.location.href = '/';
};

export const isLoggedIn = () => {
    const accessToken = getAccessTokenCookie();
    return !!accessToken;
};
