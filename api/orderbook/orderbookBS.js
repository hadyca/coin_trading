import axios from "axios";

export default async function orderbookBS(market) {
  try {
    const result = await axios.get(
      `https://api.bithumb.com/public/orderbook/${market}`,
      {
        params: { count: 1 },
      }
    );
    return {
      market: result.data.data.order_currency,
      ask_price: result.data.data.asks[0].price,
      bid_price: result.data.data.bids[0].price,
    };
  } catch (error) {
    orderbookBS(market);
    console.log("BS orderbook error");
  }
}
