import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function accountsBS() {
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
    return result.data;
  } catch (error) {
    console.log("accountError!", error);
  }
}
