import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function accountsBS2() {
  try {
    const req_query = {
      endpoint: "/info/account",
      order_currency: "XRP",
      payment_currency: "KRW",
    };

    const result = await axios({
      url: `https://api.bithumb.com${req_query.endpoint}`,
      method: "post",
      headers: bithumbHeader(req_query),
      data: req_query,
    });
    return console.log(result.data);
  } catch (error) {
    console.log("BS accountError!:", error);
  }
}
