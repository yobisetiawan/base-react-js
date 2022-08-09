import { useEffect, useRef, useState } from "react";
import {
    toaster,
} from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../configs/RouteName";

export const validationMessage = (errForm: any, field: string) => {

    if (errForm && errForm[field]) {
        return errForm[field].join(', ');
    }

    return null;
}

export const useBaseFormHook = () => {
    const formData = useRef(null) as any;
    const [isLoading, setIsLoading] = useState(false);
    const [errForm, setErrForm] = useState({}) as any;

    return { isLoading, setIsLoading, errForm, setErrForm, formData };
}

export const useFirstLoad = (onFirstLoad?: () => void) => {
    const isFirstLoad = useRef(true) as any;

    useEffect(() => {

        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            if (onFirstLoad) {
                onFirstLoad();
            }
        }

    }, [onFirstLoad]);

    return isFirstLoad.current;
}


interface UseBaseRequestConfig {
    showMessageToaster: boolean;
    logoutIf401: boolean;
}
interface UseBaseRequestParams {
    api: any;
    onSuccess?: (data?: any) => void;
    onError?: (data?: any) => void;
    config?: UseBaseRequestConfig
}

export const useBaseRequestConfig: UseBaseRequestConfig = {
    showMessageToaster: true,
    logoutIf401: true,
};

export const useBaseRequest = ({ api, onSuccess, onError, config }: UseBaseRequestParams) => {
    const { isLoading, setIsLoading, errForm, setErrForm } = useBaseFormHook();
    const successData = useRef(null) as any;

    const navigate = useNavigate();

    const submitRequest = () => {
        setIsLoading(true);
        let c = config;

        if (c === undefined) {
            c = { ...useBaseRequestConfig };
        }

        api().then((ress: any) => {
            successData.current = ress.data;
            setErrForm(null);
            if (onSuccess) {
                onSuccess(successData.current);
            }
        })
            .catch((err: any) => {

                if (c?.showMessageToaster && err?.response?.data?.message) {
                    if (err?.response?.status === 401) {
                        toaster.danger(err.response.data.message, {
                            id: 'forbidden-action'
                        });
                    } else {
                        toaster.danger(err.response.data.message);
                    }

                }

                if (err?.response?.data?.errors) {
                    setErrForm(err.response.data.errors);
                }

                if (c?.logoutIf401 && err?.response?.status === 401) {
                    navigate(RouteName.init);
                }

                if (onError) {
                    onError(err);
                }

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { isLoading, setIsLoading, errForm, setErrForm, submitRequest, successData };
}