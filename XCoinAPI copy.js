import request from "request";
import cryptojsHmacSHA512 from "crypto-js/hmac-sha512";
require("dotenv").config();

const api_base = "https://api.bithumb.com";
const api_private_info = {
  apiKey: process.env.BITHUMB_OPEN_API_ACCESS_KEY,
  secretKey: process.env.BITHUMB_OPEN_API_SECRET_KEY,
};

const req_query = {
  endPoint: "",
  order_currency: "BTC",
  payment_currency: "KRW",
};

const make_header = (obj) => {
  let output_string = [];
  Object.keys(obj).forEach((val) => {
    let key = val;
    key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
    let value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape));
    output_string.push(key + "=" + value);
  });

  return output_string.join("&");
};

console.log(make_header(req_query));
