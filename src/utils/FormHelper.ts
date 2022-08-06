import { useRef, useState } from "react";
import {
    toaster,
} from "evergreen-ui";

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


export const useBaseFormRequest = (api: any, onSuccess?: (data: any) => void) => {
    const { isLoading, setIsLoading, errForm, setErrForm } = useBaseFormHook();
    const successData = useRef(null) as any;

    const submitRequest = () => {
        setIsLoading(true);
        api().then((ress: any) => {
            successData.current = ress.data;
            setErrForm(null);
            if (onSuccess) {
                onSuccess(successData.current);
            }
        })
            .catch((err: any) => {
                if (err?.response?.data?.message) {
                    toaster.danger(err.response.data.message);
                }

                if (err?.response?.data?.errors) {
                    setErrForm(err.response.data.errors);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { isLoading, setIsLoading, errForm, setErrForm, submitRequest, successData };
}