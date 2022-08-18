import axios from "axios";
require("dotenv").config();
import accountsUp from "./api/accounts/accountsUB";
import orderbookBS from "./api/orderbook/orderbookBS";
import orderbookUB from "./api/orderbook/orderbookUB";
import client from "./client";

const UPBIT_FEE = 0.0005; // 최소 주문 5000원  0.0005;
const BITTHUMB_FEE = 0.0005; // 최소 주문 500원, 쿠폰 적용 시, 0.0004 && 미 적용시 0.0025

const UBBIT = "UB_BIT";
const BITTHUMB = "BIT_THUMB";
// accountsUp();

const test = async () => {
  const url = process.env.TELEGRAM_URL;
  const coin = "ETH";
  // axios.post(url, {
  //   chat_id: process.env.TELEGRAM_ID,
  //   // text: `업비트 ${ubBidOrigin} 매도, 빗썸 ${bsAskOrigin} 매수 // 차액 ${
  //   //   ubBidOrigin - bsAskOrigin
  //   // }`,
  //   text: `안녕 셩준아`,
  // });

  // const ubResult = await orderbookUB(`KRW-${coin}`);
  // const bsResult = await orderbookBS(`${coin}_KRW`);

  const coin_1 = "ETH";
  const coin_2 = "ETC";
  const coin_3 = "BCH";
  const ubResult_1 = await orderbookUB(`KRW-${coin_1}`);
  console.log(ubResult_1);

  const ubResult_2 = await orderbookUB(`KRW-${coin_2}`);
  console.log(ubResult_2);

  // const bsResult = await orderbookBS(
  //   `${coin_1}_KRW`,
  //   `${coin_2}_KRW`,
  //   `${coin_3}_KRW`
  // );
  // console.log(bsResult);
  // const ubAskOrigin = parseFloat(ubResult.ask_price); //a
  // const ubBidOrigin = parseFloat(ubResult.bid_price); //b

  // const bsAskOrigin = parseFloat(bsResult.data.asks[0].price); //c
  // const bsBidOrigin = parseFloat(bsResult.data.bids[0].price); //d

  // const ubAskWithFee = ubAskOrigin * UPBIT_FEE;
  // const ubBidWithFee = ubBidOrigin * UPBIT_FEE;

  // const bsAskwithFee = bsAskOrigin * BITTHUMB_FEE;
  // const bsBidwithFee = bsBidOrigin * BITTHUMB_FEE;

  // if (ubBidOrigin - bsAskOrigin > 0) {
  //   console.log(
  //     `${coin}빗썸 ${bsAskOrigin} 매수, 업비트 ${ubBidOrigin} 매도 // 차액 ${
  //       ubBidOrigin - bsAskOrigin
  //     }`
  //   );
  //   try {
  //     const exist = await client.trading.findFirst({
  //       where: {
  //         difference: ubBidOrigin - bsAskOrigin,
  //       },
  //     });
  //     if (!exist) {
  //       await client.trading.create({
  //         data: {
  //           coin,
  //           buyShop: BITTHUMB,
  //           buyPrice: bsAskOrigin,
  //           buyFee: bsAskwithFee,
  //           sellShop: UBBIT,
  //           sellPrice: ubBidOrigin,
  //           sellFee: ubBidWithFee,
  //           difference: ubBidOrigin - bsAskOrigin,
  //           netIncome:
  //             ubBidOrigin - bsAskOrigin - (ubBidWithFee + bsAskwithFee),
  //           difRatio: (ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin),
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log("에러메시지3", error);
  //   }
  // } else if (bsBidOrigin - ubAskOrigin > 0) {
  //   console.log(
  //     `${coin}업비트 ${ubAskOrigin} 매수, 빗썸 ${bsBidOrigin} 매도 // 차액 ${
  //       bsBidOrigin - ubAskOrigin
  //     }`
  //   );
  //   try {
  //     const exist = await client.trading.findFirst({
  //       where: {
  //         difference: bsBidOrigin - ubAskOrigin,
  //       },
  //     });
  //     if (!exist) {
  //       await client.trading.create({
  //         data: {
  //           coin,
  //           buyShop: UBBIT,
  //           buyPrice: ubAskOrigin,
  //           buyFee: ubAskWithFee,
  //           sellShop: BITTHUMB,
  //           sellPrice: bsBidOrigin,
  //           sellFee: bsBidwithFee,
  //           difference: bsBidOrigin - ubAskOrigin,
  //           netIncome:
  //             bsBidOrigin - ubAskOrigin - (ubAskWithFee + bsBidwithFee),
  //           difRatio: (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin),
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log("에러메시지4", error);
  //   }
  // } else {
  //   console.log(`${coin}불발!`);
  // }
};

test();

const requestApi = () => setInterval(test, 1000);

// requestApi();

//bid 매수, ask 매도
