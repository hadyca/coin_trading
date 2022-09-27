import axios from "axios";
require("dotenv").config();
import bithumbHeader from "../../component/bithumbHeader";

export default async function historyBS(coin, orderId) {
  try {
    const req_query = {
      endpoint: "/info/order_detail",
      order_currency: coin,
      order_id: orderId,
    };
    const result = await axios({
      url: `https://api.bithumb.com${req_query.endpoint}`,
      method: "post",
      headers: bithumbHeader(req_query),
      data: req_query,
    });

    const contract = result.data.data.contract;

    if (contract.length === 1) {
      const everagePrice = contract[0].price * contract[0].units;
      return everagePrice;
    } else {
      const everagePrice =
        contract.reduce((a, c) => a.price * a.units + c.price * c.units) /
        contract.length;
      return everagePrice;
    }
  } catch (error) {
    console.log("BS history error!:", error);
  }
}
