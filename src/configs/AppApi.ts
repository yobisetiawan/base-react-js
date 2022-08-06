import axios from "axios";
import { API_HOST } from "./AppConfig";

export const API = {
    login: (data: any) => axios
        .post(API_HOST + "/auth/login", data),
    forgotPassword: (data: any) => axios
        .post(API_HOST + "/auth/forgot-password", data),
    resetPassword: (data: any) => axios
        .post(API_HOST + "/auth/reset-password", data)

}