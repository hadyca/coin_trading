import axios from "axios";
require("dotenv").config();
import accountsUp from "./api/accounts/accountsUB";
import orderbookBS from "./api/orderbook/orderbookBS";
import orderbookUB from "./api/orderbook/orderbookUB";
import client from "./client";
import execution from "./component/execution";

// accountsUp();

const test = async () => {
  const url = process.env.TELEGRAM_URL;
  const coin = "ETH";

  const coin_1 = "ETH";
  const coin_2 = "ETC";
  const coin_3 = "BCH";

  const ubResult_1 = await orderbookUB(`KRW-${coin_1}`);
  const bsResult_1 = await orderbookBS(`${coin_1}_KRW`);
  await execution(coin_1, ubResult_1, bsResult_1);

  const ubResult_2 = await orderbookUB(`KRW-${coin_2}`);
  const bsResult_2 = await orderbookBS(`${coin_2}_KRW`);
  await execution(coin_2, ubResult_2, bsResult_2);

  const ubResult_3 = await orderbookUB(`KRW-${coin_3}`);
  const bsResult_3 = await orderbookBS(`${coin_3}_KRW`);
  await execution(coin_3, ubResult_3, bsResult_3);
};

test();

const requestApi = () => setInterval(test, 1000);

requestApi();

//bid 매수, ask 매도
