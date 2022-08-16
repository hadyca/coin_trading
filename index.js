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
  const coin = "ANKR";
  // axios.post(url, {
  //   chat_id: process.env.TELEGRAM_ID,
  //   // text: `업비트 ${ubBidOrigin} 매도, 빗썸 ${bsAskOrigin} 매수 // 차액 ${
  //   //   ubBidOrigin - bsAskOrigin
  //   // }`,
  //   text: `안녕 셩준아`,
  // });

  const ubResult = await orderbookUB(`KRW-${coin}`);
  const bsResult = await orderbookBS(`${coin}_KRW`);

  const ubAskOrigin = parseFloat(ubResult.ask_price); //a
  const ubBidOrigin = parseFloat(ubResult.bid_price); //b

  const bsAskOrigin = parseFloat(bsResult.data.asks[0].price); //c
  const bsBidOrigin = parseFloat(bsResult.data.bids[0].price); //d

  console.log("업비트 매도호가", ubAskOrigin);
  console.log("업비트 매수호가", ubBidOrigin);

  console.log("빗썸 매도호가", bsAskOrigin);
  console.log("빗썸 매수호가", bsBidOrigin);

  const ubAskWithFee = ubAskOrigin * UPBIT_FEE;
  const ubBidWithFee = ubBidOrigin * UPBIT_FEE;

  const bsAskwithFee = bsAskOrigin * BITTHUMB_FEE;
  const bsBidwithFee = bsBidOrigin * BITTHUMB_FEE;

  // console.log("업비트 매도가(수수료 적용)", ubAsk);
  // console.log("업비트 매수가(수수료 적용)", ubBid);

  // console.log("빗썸 매도가(수수료 적용)", bsAsk);
  // console.log("빗썸 매수가(수수료 적용)", bsBid);

  //   console.log("업비트 매수, 빗썸 매도 차액", ubBid - bsAsk);
  //   console.log("업비트 매도, 빗썸 매수 차액", bsAsk - ubBid);
  if (ubBidOrigin - bsAskOrigin > 0) {
    console.log(
      `${coin}업비트 ${ubBidOrigin} 매도, 빗썸 ${bsAskOrigin} 매수 // 차액 ${
        ubBidOrigin - bsAskOrigin
      } // 순수익 ${ubBidOrigin - bsAskOrigin - (BITTHUMB_FEE + UPBIT_FEE)}`
    );
    try {
      const exist = await client.trading.findFirst({
        where: {
          difference: ubBidOrigin - bsAskOrigin,
        },
      });
      if (!exist) {
        await client.trading.create({
          data: {
            coin,
            bidShop: BITTHUMB,
            bidPrice: bsAskOrigin,
            bidFee: bsAskwithFee,
            askShop: UBBIT,
            askPrice: ubBidOrigin,
            askFee: ubBidWithFee,
            difference: ubBidOrigin - bsAskOrigin,
            netIncome:
              ubBidOrigin - bsAskOrigin - (ubBidWithFee + bsAskwithFee),
          },
        });
      }
    } catch (error) {
      console.log("에러메시지3", error);
    }
  } else if (bsBidOrigin - ubAskOrigin > 0) {
    console.log(
      `${coin}업비트 ${ubAskOrigin} 매수, 빗썸 ${bsBidOrigin} 매도 // 차액 ${
        bsBidOrigin - ubAskOrigin
      }`
    );
    try {
      const exist = await client.trading.findFirst({
        where: {
          difference: bsBidOrigin - ubAskOrigin,
        },
      });
      if (!exist) {
        await client.trading.create({
          data: {
            coin,
            bidShop: UBBIT,
            bidPrice: ubBidOrigin,
            bidFee: ubBidWithFee,
            askShop: BITTHUMB,
            askPrice: bsAskOrigin,
            askFee: bsAskwithFee,
            difference: bsBidOrigin - ubAskOrigin,
            netIncome:
              bsBidOrigin - ubAskOrigin - (ubBidWithFee + bsAskwithFee),
          },
        });
      }
    } catch (error) {
      console.log("에러메시지4", error);
    }
  } else {
    console.log(`${coin}불발!`);
  }
};

// test();

const requestApi = () => setInterval(test, 1000);

requestApi();

//bid 매수, ask 매도
