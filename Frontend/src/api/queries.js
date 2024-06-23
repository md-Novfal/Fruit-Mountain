import { useQuery } from 'react-query';
import { getAllPosts, getAllUsers, getPost } from './api.constant';

export const usePosts = () => {
    return useQuery('posts', getAllPosts);
};

export const useUsers = () => {
    return useQuery('users', getAllUsers);
};

export const usePost = (id) => {
    return useQuery(['post', id], () => getPost(id));
};
