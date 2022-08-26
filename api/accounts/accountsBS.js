const axios = require("axios").default;
require("dotenv").config();
import XCoinAPI from "../../XCoinAPI";

const api_key = process.env.BITTHUMB_OPEN_API_ACCESS_KEY;
const api_secret = process.env.BITTHUMB_OPEN_API_SECRET_KEY;

const xcoinAPI = new XCoinAPI(api_key, api_secret);
const rgParams = {
  order_currency: "BTC",
  payment_currency: "KRW",
};

export default async function accountsBS() {
  const res = await xcoinAPI.xcoinApiCall("/info/account", rgParams);
  console.log(res.body);
}
