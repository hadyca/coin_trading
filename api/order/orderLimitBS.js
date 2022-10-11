import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function orderLimitBS(coin, coinVolume, price, type) {
  try {
    const req_query = {
      endpoint: "/trade/place",
      order_currency: coin,
      payment_currency: "KRW",
      units: coinVolume,
      price: String(price),
      type,
    };

    const result = await axios.post(
      `https://api.bithumb.com${req_query.endpoint}`,
      req_query,
      {
        headers: bithumbHeader(req_query),
      }
    );
    return result.data;
  } catch (error) {
    console.log(`BS limit ${type} order error!`);
  }
}
