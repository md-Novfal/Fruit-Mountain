/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../Authentication/auth';
import { getAdminValueCookies } from '../helper/cookies';
import Layout from '../pages/Layout';

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//     const isAdmin = getAdminValueCookies() === true;

//     if (!isLoggedIn()) {
//         return <Navigate to="/login" />;
//     }

//     if (adminOnly && !isAdmin) {
//         return <Navigate to="/Post" />;
//     }

//     return <Layout>{children}</Layout>;
// };

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const isAdmin = getAdminValueCookies() === true;

    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/Post" />;
    }

    return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
