const axios = require("axios").default;

export default async function orderbookUB(market) {
  try {
    const result = await axios.get("https://api.upbit.com/v1/orderbook", {
      params: { markets: market },
    });
    return result.data[0].orderbook_units[0];
  } catch (error) {
    console.log(error);
  }
}
