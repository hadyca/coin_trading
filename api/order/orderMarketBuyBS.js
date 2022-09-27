import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function orderMarketBuyBS(coin, volume) {
  try {
    const req_query = {
      endpoint: "/trade/market_buy",
      order_currency: coin,
      payment_currency: "KRW",
      units: volume,
    };

    const result = await axios({
      url: `https://api.bithumb.com${req_query.endpoint}`,
      method: "post",
      headers: bithumbHeader(req_query),
      data: req_query,
    });
    return result;
  } catch (error) {
    console.log("BS market buy error:", error);
  }
}
