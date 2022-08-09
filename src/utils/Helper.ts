const objectToQuery = (object: any) => {
    return new URLSearchParams(object).toString()
}

const debounce = (ref: any, run: () => any, ms: number = 500) => {
    clearTimeout(ref.current);
   

    ref.current = setTimeout(() => {
        run()
    }, ms);
}



export { objectToQuery, debounce }