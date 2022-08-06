const axios = require("axios").default;

export default function orderbookUB() {
  axios
    .get("https://api.upbit.com/v1/orderbook", {
      params: { markets: "KRW-BTC" },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.response));
}
