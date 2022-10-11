import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function withrawBS(coin, coinVolume) {
  if (coin === "ETC") {
    try {
      const req_query = {
        endpoint: "/trade/btc_withdrawal",
        units: coinVolume,
        address: process.env.ETC_ADDRESS,
        currency: coin,
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
  if (coin === "XRP") {
    try {
      const req_query = {
        endpoint: "/trade/btc_withdrawal",
        units: coinVolume,
        address: process.env.XRP_ADDRESS,
        destination: process.env.XRP_DESTINATION_TAG,
        currency: coin,
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
}
