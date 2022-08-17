const axios = require("axios").default;

export default async function orderbookBS(market_1, market_2, market_3) {
  try {
    const result = await axios.all([
      axios.get(`https://api.bithumb.com/public/orderbook/${market_1}`, {
        params: { count: 1 },
      }),
      axios.get(`https://api.bithumb.com/public/orderbook/${market_2}`, {
        params: { count: 1 },
      }),
      axios.get(`https://api.bithumb.com/public/orderbook/${market_3}`, {
        params: { count: 1 },
      }),
    ]);
    let marketAry = [];
    result.forEach((item, index) =>
      marketAry.push({
        market: result[index].data.data.order_currency,
        ask_price: result[index].data.data.asks[0].price,
        bid_price: result[index].data.data.bids[0].price,
      })
    );
    return marketAry;
  } catch (error) {
    console.log("errMessage2", error);
  }
}
