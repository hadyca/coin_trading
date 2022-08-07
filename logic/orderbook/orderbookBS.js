const axios = require("axios").default;

export default function orderbookBS() {
  axios
    .get("https://api.bithumb.com/public/orderbook/BTC_KRW", {
      params: { count: 1 },
    })
    .then((res) => console.log(res.data.data.bids))
    .catch((err) => console.log(err.response));
}
