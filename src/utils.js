const someCommonValues = ['common', 'values'];

export const formatCurrency = (number) => {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    }).format(number)
}

export const addPrices = (price1, price2) => {
    return parseFloat(price1) + parseFloat(price2)
};