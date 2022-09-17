import axios from "axios";
import accountsBS from "./api/accounts/accountsBS";
require("dotenv").config();
import accountsUp from "./api/accounts/accountsUB";
import orderbookBS from "./api/orderbook/orderbookBS";
import orderbookUB from "./api/orderbook/orderbookUB";
import client from "./client";
import execution from "./component/execution";

accountsBS();
// accountsUp();

const test = async () => {
  const url = process.env.TELEGRAM_URL;

  const coin_1 = "WAXP";
  const coin_2 = "XRP";
  const coin_3 = "QTUM";
  const coin_4 = "ETC";
  const coin_5 = "ADA";

  const ubResult_1 = await orderbookUB(`KRW-${coin_1}`);
  const bsResult_1 = await orderbookBS(`${coin_1}_KRW`);
  await execution(coin_1, ubResult_1, bsResult_1);

  const ubResult_2 = await orderbookUB(`KRW-${coin_2}`);
  const bsResult_2 = await orderbookBS(`${coin_2}_KRW`);
  await execution(coin_2, ubResult_2, bsResult_2);

  const ubResult_3 = await orderbookUB(`KRW-${coin_3}`);
  const bsResult_3 = await orderbookBS(`${coin_3}_KRW`);
  await execution(coin_3, ubResult_3, bsResult_3);

  const ubResult_4 = await orderbookUB(`KRW-${coin_4}`);
  const bsResult_4 = await orderbookBS(`${coin_4}_KRW`);
  await execution(coin_4, ubResult_4, bsResult_4);

  const ubResult_5 = await orderbookUB(`KRW-${coin_5}`);
  const bsResult_5 = await orderbookBS(`${coin_5}_KRW`);
  await execution(coin_5, ubResult_5, bsResult_5);
};

// test();

const requestApi = () => setInterval(test, 1000);

requestApi();

//bid 매수, ask 매도
