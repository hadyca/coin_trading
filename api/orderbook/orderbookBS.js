const axios = require("axios").default;

export default async function orderbookBS(market) {
  try {
    const result = await axios.get(
      `https://api.bithumb.com/public/orderbook/${market}`,
      {
        params: { count: 1 },
      }
    );
    return result.data;
  } catch (error) {
    console.log("에러메시지2", error);
  }
}
