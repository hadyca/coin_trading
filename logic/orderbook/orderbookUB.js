const axios = require("axios").default;

export default function orderbookUB() {
  axios
    .get("https://api.upbit.com/v1/orderbook", {
      params: { markets: "KRW-BTC" },
    })
    .then((res) => console.log("업비트", res.data[0].orderbook_units[0]))
    .catch((err) => console.log(err.response));
}
