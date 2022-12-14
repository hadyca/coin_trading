const axios = require("axios").default;
require("dotenv").config();
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

export default async function orderUB(coin, side, volume, price) {
  const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
  const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;

  //지정가 로직
  const body =
    side === "ask"
      ? {
          market: `KRW-${coin}`,
          side,
          volume,
          price: String(price),
          ord_type: "limit",
        }
      : side === "bid"
      ? {
          market: `KRW-${coin}`,
          side,
          volume,
          price: String(price),
          ord_type: "limit",
        }
      : null;

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
      url: "https://api.upbit.com/v1/orders",
      method: "post",
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.log(`UB ${side} error!, coin : ${coin}`);
    return "error";
  }
}
