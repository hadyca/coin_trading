require("dotenv").config();
const request = require("request");
const uuidv4 = require("uuid/v4");
const sign = require("jsonwebtoken").sign;

// const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
// const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
// const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

// const payload = {
//   access_key: access_key,
//   nonce: uuidv4(),
// };

// const token = sign(payload, secret_key);
// const options = {
//   method: "GET",
//   url: server_url + "/v1/accounts",
//   headers: { Authorization: `Bearer ${token}` },
// };

// import axios from "axios";

// axios
//   .get("https://api.upbit.com/v1/orderbook?markets=KRW-BTC")
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));

import axios from "axios";

const options = {
  method: "GET",
  url: "https://api.upbit.com/v1/market/all",
  params: { isDetails: "false" },
  headers: { Accept: "application/json" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
