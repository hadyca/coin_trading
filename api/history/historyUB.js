const axios = require("axios").default;
require("dotenv").config();
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

export default async function historyUB(orderId) {
  const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
  const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;

  const body = {
    uuid: orderId,
  };

  const query = queryEncode(body);
  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = sign(payload, secret_key);

  try {
    const result = await axios({
      url: "https://api.upbit.com/v1/order?" + query,
      method: "get",
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
    const trades = result.trades;
    if (trades.length === 1) {
      const everagePrice = trades[0].price * trades[0].volume;
      return everagePrice;
    } else {
      const everagePrice =
        contract.reduce((a, c) => a.price * a.volume + c.price * c.volume) /
        contract.length;
      return everagePrice;
    }
  } catch (error) {
    console.log("UB history error!:", error);
  }
}
