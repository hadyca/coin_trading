const axios = require("axios").default;
require("dotenv").config();
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;

export default async function orderUB(coin, side, volume, price) {
  const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
  const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;

  //시장가 : 매도 할 때는 수량을 지정, 매수 할 때는 금액을 지정
  // if (side === "ask") {
  //   const body = {
  //     market: `KRW-${coin}`,
  //     side,
  //     volume,
  //     ord_type: "price",
  //   };
  // } else if (side === "bid") {
  //   const body = {
  //     market: `KRW-${coin}`,
  //     side,
  //     price,
  //     ord_type: "price",
  //   };
  // }

  const body =
    side === "ask"
      ? {
          market: `KRW-${coin}`,
          side,
          volume,
          ord_type: "market",
        }
      : side === "bid"
      ? { market: `KRW-${coin}`, side, price, ord_type: "price" }
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
    console.log(`UB ${side} error!`);
    return "error";
  }
}
