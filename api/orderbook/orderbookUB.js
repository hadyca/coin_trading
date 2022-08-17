const axios = require("axios").default;

export default async function orderbookUB(market_1, market_2, market_3) {
  try {
    const result = await axios.all([
      axios.get("https://api.upbit.com/v1/orderbook", {
        params: { markets: market_1 },
      }),
      axios.get("https://api.upbit.com/v1/orderbook", {
        params: { markets: market_2 },
      }),
      axios.get("https://api.upbit.com/v1/orderbook", {
        params: { markets: market_3 },
      }),
    ]);
    let marketAry = [];
    result.forEach((item, index) =>
      marketAry.push({
        market: result[index].data[0].market,
        ask_price: result[index].data[0].orderbook_units[0].ask_price,
        bid_price: result[index].data[0].orderbook_units[0].bid_price,
      })
    );
    return marketAry;
  } catch (error) {
    console.log("errMessage1", error);
  }
}
