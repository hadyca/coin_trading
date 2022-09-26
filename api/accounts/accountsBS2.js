import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function accountsBS2() {
  try {
    const req_query = {
      endpoint: "/info/account",
      order_currency: "BTC",
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
    console.log("BS accountError!:", error);
  }
}
