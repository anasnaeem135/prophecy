import axios from 'axios';

const COIN_MARKET_CAP_API_URL =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

const getCurrentPrices = async cryptocurrencies => {
    const options = {
        headers: {
            'X-CMC_PRO_API_KEY': '8c778a4e-f1ae-42b9-abe0-efb9a870d00e',
        },
        params: {
            symbol: cryptocurrencies.join(','),
        },
    };

    try {
        const response = await axios.get(COIN_MARKET_CAP_API_URL, options);
        const data = response.data.data;

        console.log('Data is :', data);

        // Extract the price for each cryptocurrency
        const prices = Object.values(data).map(
            crypto => crypto.quote.USD.price,
        );

        return prices;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getCurrentPrices;
