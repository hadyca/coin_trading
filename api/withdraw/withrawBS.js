import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function withrawBS() {
  try {
    const req_query = {
      endpoint: "/trade/btc_withdrawal",
      units: "21",
      address: "raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA",
      destination: "440248997",
      currency: "XRP",
      exchange_name: "upbit",
      cust_type_cd: "01",
      ko_name: "김제형",
      en_name: "kimjehyung",
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
    console.log("BS withraw error!:", error);
  }
}
