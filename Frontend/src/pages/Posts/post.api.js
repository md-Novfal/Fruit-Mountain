import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/api.constant";


export const CreatePostApi = (url) => {
    return useMutation({
        mutationFn: (data) =>
            axiosInstance.post(url, data).then((res) => res.data.responseObj),
    });

}

export const UpdatePostApi = (url) => {
    return useMutation({
        mutationFn: (data) =>
            axiosInstance.post(url, data).then((res) => res.data.responseObj),
    });
}

export const GetSinglePost = (url) => {
    return useMutation({
        mutationFn: (data) =>
            axiosInstance.post(url, data).then((res) => res.data.responseObj),
    });
}

export const UseGetAllPost = ({ page, pageSize, searchKey }) => {
    searchKey = searchKey ? searchKey : "";
    return useQuery({
        queryKey: ["getAllPost", page, pageSize, searchKey],
        queryFn: () =>
            axiosInstance
                .post(`/v1/post/get/all?pgNumber=${page + 1}&pgSize=${pageSize}`)
                .then((response) => {
                    return response.data.responseObj.responseDataParams.data
                }),
        keepPreviousData: false,
    });
};