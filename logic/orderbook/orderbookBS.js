const axios = require("axios").default;

export default function orderbookBS() {
  axios
    .get("https://api.bithumb.com/public/orderbook/BTC_KRW", {
      params: { count: 1 },
    })
    .then((res) => {
      console.log("빗썸 매도가", res.data.data.asks);
      console.log("빗썸 매수가", res.data.data.bids);
    })
    .catch((err) => console.log(err.response));
}
