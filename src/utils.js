export const formatCurrency = (number) => {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    }).format(number)
}

// https://gist.github.com/nmsdvid/8807205#gistcomment-3325286
export const debounce = (callback, wait = 250) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), wait);
    };
};