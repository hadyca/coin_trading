import axios from "axios";

export default async function orderbookUB(market) {
  try {
    const result = await axios.get("https://api.upbit.com/v1/orderbook", {
      params: { markets: market },
    });
    return {
      market: result.data[0].market,
      ask_price: result.data[0].orderbook_units[0].ask_price,
      bid_price: result.data[0].orderbook_units[0].bid_price,
    };
  } catch (error) {
    orderbookUB(market);
    console.log("UB orderbook error:", error);
  }
}
