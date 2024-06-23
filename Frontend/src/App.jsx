import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import PostsList from './pages/Posts/PostList';
import UserList from './pages/Users/UsersList';
import CreatePostPage from './pages/Posts/CreatePost';
import ProtectedRoute from './Routes/ProtectRouter';
import { getAdminValueCookies } from './helper/cookies';
import { isLoggedIn } from './Authentication/auth';
import ViewUser from './pages/Users/ViewUser';

const App = () => {
    const isAdmin = getAdminValueCookies() === true;
    const mainUrl = isAdmin ? '/Users' : '/Post';

    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                {isAdmin && (
                    <>
                        <Route
                            path="/Users"
                            element={
                                <ProtectedRoute adminOnly>
                                    <UserList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/Users/view"
                            element={
                                <ProtectedRoute adminOnly>
                                    <ViewUser />
                                </ProtectedRoute>
                            }
                        />
                    </>
                )}
                <Route
                    path="/Post"
                    element={
                        <ProtectedRoute>
                            <PostsList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/Post/create"
                    element={
                        <ProtectedRoute>
                            <CreatePostPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={isLoggedIn() ? <Navigate to={mainUrl} /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={isLoggedIn() ? <Navigate to={mainUrl} /> : <Signup />}
                />
                <Route path="*" element={<Navigate to={isLoggedIn() ? mainUrl : '/login'} />} />
            </Routes>
        </Router>
    );
};

export default App;
