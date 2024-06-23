import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/api.constant";

export const LoginApi = (url) => {
    return useMutation({
        mutationFn: (data) =>
            axiosInstance.post(url, data).then((res) => res.data.responseObj),
    });

}


export const SignUpApi = (url) => {
    return useMutation({
        mutationFn: (data) =>
            axiosInstance.post(url, data).then((res) => res.data.responseObj),
    });

}