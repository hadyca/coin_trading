import axios from "axios";
import accountsBS from "./api/accounts/accountsBS";
import accountsBS2 from "./api/accounts/accountsBS2";
require("dotenv").config();
import accountsUB from "./api/accounts/accountsUB";
import historyBS from "./api/history/historyBS";
import historyUB from "./api/history/historyUB";
import orderCancelBS from "./api/order/orderCancelBS";
import orderLimitBS from "./api/order/orderLimitBS";
import orderMarketBuyBS from "./api/order/orderMarketBuyBS";
import orderMarketSellBS from "./api/order/orderMarketSellBS";
import orderUB from "./api/order/orderUB";
import orderbookBS from "./api/orderbook/orderbookBS";
import orderbookUB from "./api/orderbook/orderbookUB";
import withrawBS from "./api/withdraw/withrawBS";
import withrawUB from "./api/withdraw/withrawUB";
import client from "./client";
import exchange from "./component/exchange";

// orderUB();
// accountsUB();
// accountsBS2();
// withrawUB();
// orderMarketBuyBS("ETC", "10");
// accountsBS2();
// orderMarketSellBS();
orderLimitBS("XRP", "2", "682.5", "bid");
// orderCancelBS();
// withrawBS();
// orderLimitBS();
// historyBS();

const app = async () => {
  const coin_1 = "ETC";
  const coin_2 = "XRP";
  // const coin_3 = "QTUM";
  // const coin_4 = "WAXP";
  // const coin_5 = "ADA";

  const ubResult_1 = await orderbookUB(`KRW-${coin_1}`);
  const bsResult_1 = await orderbookBS(`${coin_1}_KRW`);
  const targetRatio_1 = 0.0006;
  const coinVolume_1 = "1";
  await exchange(coin_1, coinVolume_1, targetRatio_1, ubResult_1, bsResult_1);

  const ubResult_2 = await orderbookUB(`KRW-${coin_2}`);
  const bsResult_2 = await orderbookBS(`${coin_2}_KRW`);
  const targetRatio_2 = 0.0006;
  const coinVolume_2 = "10";
  await exchange(coin_2, coinVolume_2, targetRatio_2, ubResult_2, bsResult_2);
};

// const requestApi = () => setInterval(app, 500);

// requestApi();
