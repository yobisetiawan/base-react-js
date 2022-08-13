import axios from "axios";
import { objectToQuery } from "../utils/Helper";
import { API_HOST } from "./AppConfig";

const config = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'X-PUBLIC-TOKEN': 'MSCLINIC-8VC7a6LgSHy6ulqyEVDVNIgyUcIZZMi6LEbtK265wuoEgEARAs8TVvknss3VxuLF'
        }
    }
};

export const API = {
    login: (data: any) => axios
        .post(API_HOST + "/auth/login", data),
    forgotPassword: (data: any) => axios
        .post(API_HOST + "/auth/forgot-password", data),
    resetPassword: (data: any) => axios
        .post(API_HOST + "/auth/reset-password", data),
    user: () => axios
        .get(API_HOST + "/user?" + objectToQuery({
            relations: [
                'avatar',
                'employee.activeBranch'
            ].join(', ')
        }), config()),
    medicalWard: (params?: any) => axios
        .get(API_HOST + "/medical/wards?" + objectToQuery(params), config()),
    employeeBranch: (params?: any) => axios
        .get(API_HOST + "/employee/branches?" + objectToQuery(params), config()),

}