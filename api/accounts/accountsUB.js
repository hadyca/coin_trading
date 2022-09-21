const axios = require("axios").default;
require("dotenv").config();
const uuidv4 = require("uuid/v4");
const sign = require("jsonwebtoken").sign;

export default function accountsUB() {
  const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY; // 업비트에서 발급 받은 access_key
  const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY; // 업비트에서 발급 받은 secret_key

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  };

  const token = sign(payload, secret_key);
  axios
    .get("https://api.upbit.com/v1/accounts", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response));
}
