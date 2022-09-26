import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function orderLimitBS() {
  try {
    const req_query = {
      endpoint: "/trade/place",
      order_currency: "XRP",
      payment_currency: "KRW",
      units: "5", //수량임
      price: "682.8",
      type: "bid",
    };

    const result = await axios.post(
      `https://api.bithumb.com${req_query.endpoint}`,
      req_query,
      {
        headers: bithumbHeader(req_query),
      }
    );
    return console.log(result.data);
  } catch (error) {
    console.log("BS market order error!:", error);
  }
}
