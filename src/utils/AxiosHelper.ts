export const validationMessage = (errForm: any, field: string) => {

    if (errForm && errForm[field]) {
        return errForm[field].join(', ');
    }

    return null;
}