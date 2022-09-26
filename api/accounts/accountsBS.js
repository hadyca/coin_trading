import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function accountsBS() {
  try {
    const req_query = {
      endpoint: "/info/balance",
      currency: "XRP",
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
