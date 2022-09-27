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

// accountsUB();
// accountsBS2();
// withrawUB();
orderMarketBuyBS("ETC", "10");
// orderUB("XRP", "bid");
// accountsBS2();
// orderMarketSellBS();
// orderLimitBS();
// orderCancelBS();
// withrawBS();
// orderLimitBS();
// historyBS();
// historyUB();

const app = async () => {
  const coin_1 = "ETC";
  // const coin_2 = "XRP";
  // const coin_3 = "QTUM";
  // const coin_4 = "WAXP";
  // const coin_5 = "ADA";

  const ubResult_1 = await orderbookUB(`KRW-${coin_1}`);
  const bsResult_1 = await orderbookBS(`${coin_1}_KRW`);
  await exchange(coin_1, ubResult_1, bsResult_1);

  // const ubResult_2 = await orderbookUB(`KRW-${coin_2}`);
  // const bsResult_2 = await orderbookBS(`${coin_2}_KRW`);
  // await execution(coin_2, ubResult_2, bsResult_2);

  // const ubResult_3 = await orderbookUB(`KRW-${coin_3}`);
  // const bsResult_3 = await orderbookBS(`${coin_3}_KRW`);
  // await execution(coin_3, ubResult_3, bsResult_3);

  // const ubResult_4 = await orderbookUB(`KRW-${coin_4}`);
  // const bsResult_4 = await orderbookBS(`${coin_4}_KRW`);
  // await execution(coin_4, ubResult_4, bsResult_4);

  // const ubResult_5 = await orderbookUB(`KRW-${coin_5}`);
  // const bsResult_5 = await orderbookBS(`${coin_5}_KRW`);
  // await execution(coin_5, ubResult_5, bsResult_5);
};

// app();

// const requestApi = () => setInterval(app, 1000);

// requestApi();

//bid 매수, ask 매도
