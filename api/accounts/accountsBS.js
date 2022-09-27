import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function accountsBS() {
  try {
    const req_query = {
      endpoint: "/info/balance",
      currency: "XRP",
    };

    const result = await axios({
      url: `https://api.bithumb.com${req_query.endpoint}`,
      method: "post",
      data: req_query,
      headers: bithumbHeader(req_query),
    });
    console.log(result.data);
    return result;
  } catch (error) {
    console.log("BS accountError!:", error);
  }
}
