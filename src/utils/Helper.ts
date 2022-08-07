const objectToQuery = (object: any) => {
    return new URLSearchParams(object).toString()
}

export { objectToQuery }