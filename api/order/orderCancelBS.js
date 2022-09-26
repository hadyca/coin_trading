import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function orderCancelBS() {
  try {
    const req_query = {
      endpoint: "/trade/cancel",
      type: "bid",
      order_id: "C0106000000444675452",
      order_currency: "XRP",
      payment_currency: "KRW",
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
