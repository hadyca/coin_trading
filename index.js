<<<<<<< HEAD
import accountsUp from "./api/accounts/accountsUB";
import orderbookBS from "./api/orderbook/orderbookBS";
import orderbookUB from "./api/orderbook/orderbookUB";

//bid 매수, ask 매도
=======
import axios from "axios";
require("dotenv").config();
import accountsUp from "./logic/accounts/accountsUB";
import orderbookBS from "./logic/orderbook/orderbookBS";
import orderbookUB from "./logic/orderbook/orderbookUB";
import client from "./client";
>>>>>>> 4ea44874578f7860c4e4156db9ed36c220985ad8

const UPBIT_FEE = 0.0005; // 최소 주문 5000원  0.0005;
const BITTHUMB_FEE = 0.0025; // 최소 주문 500원, 쿠폰 적용 시, 0.0004 && 미 적용시 0.0025

const UBBIT = "UB_BIT";
const BITTHUMB = "BIT_THUMB";
// accountsUp();

const test = async () => {
  const url = process.env.TELEGRAM_URL;
  const coin = "ETH";
  // axios.post(url, {
  //   chat_id: process.env.TELEGRAM_ID,
  //   text: `업비트 ${ubBidOrigin} 매도, 빗썸 ${bsAskOrigin} 매수 // 차액 ${
  //     ubBidOrigin - bsAskOrigin
  //   }`,
  // });

  const ubResult = await orderbookUB(`KRW-${coin}`);
  const bsResult = await orderbookBS(`${coin}_KRW`);

  const ubAskOrigin = ubResult.ask_price; //a
  const ubBidOrigin = ubResult.bid_price; //b

<<<<<<< HEAD
  // console.log("업비트 매도가", ubAskOrigin);
  // console.log("업비트 매수가", ubBidOrigin);

  // console.log("빗썸 매도가", bsAskOrigin);
  // console.log("빗썸 매수가", bsBidOrigin);

  const ubAsk = ubAskOrigin * (1 - UPBIT_FEE);
  const ubBid = ubBidOrigin * (1 - UPBIT_FEE);

  const bsAsk = bsAskOrigin * (1 - BITTHUMB_FEE);
  const bsBid = bsBidOrigin * (1 - BITTHUMB_FEE);

  console.log("업비트 매도가(수수료 적용)", ubAsk);
  console.log("업비트 매수가(수수료 적용)", ubBid);

  console.log("빗썸 매도가(수수료 적용)", bsAsk);
  console.log("빗썸 매수가(수수료 적용)", bsBid);

  // console.log("업비트 매수, 빗썸 매도 차액", ubBid - bsAsk);
  // console.log("업비트 매도, 빗썸 매수 차액", bsAsk - ubBid);

  //   if (ubBid - bsAsk > 0) {
  //     // 실행 : 업비트 매수, 빗썸에 매도
  //     console.log("업비트 매수, 빗썸 매도 차액", ubBid - bsAsk);
  //   } else {
  //     //실행 : 업비트 매도, 빗썸 매수
  //     console.log("업비트 매도, 빗썸 매수 차액", bsAsk - ubBid);
  //   }
=======
  const bsAskOrigin = bsResult.data.asks[0].price; //c
  const bsBidOrigin = bsResult.data.bids[0].price; //d

  console.log("업비트 매도호가", ubAskOrigin);
  console.log("업비트 매수호가", ubBidOrigin);

  console.log("빗썸 매도호가", bsAskOrigin);
  console.log("빗썸 매수호가", bsBidOrigin);

  const ubAsk = ubAskOrigin * (1 - UPBIT_FEE);
  const ubBid = ubBidOrigin * (1 - UPBIT_FEE);

  const bsAsk = bsAskOrigin * (1 - BITTHUMB_FEE);
  const bsBid = bsBidOrigin * (1 - BITTHUMB_FEE);

  // console.log("업비트 매도가(수수료 적용)", ubAsk);
  // console.log("업비트 매수가(수수료 적용)", ubBid);

  // console.log("빗썸 매도가(수수료 적용)", bsAsk);
  // console.log("빗썸 매수가(수수료 적용)", bsBid);

  //   console.log("업비트 매수, 빗썸 매도 차액", ubBid - bsAsk);
  //   console.log("업비트 매도, 빗썸 매수 차액", bsAsk - ubBid);
  console.log(ubBidOrigin - bsAskOrigin);
  if (ubBidOrigin - bsAskOrigin > 0) {
    console.log(
      `${coin}업비트 ${ubBidOrigin} 매도, 빗썸 ${bsAskOrigin} 매수 // 차액 ${
        ubBidOrigin - bsAskOrigin
      }`
    );
  } else if (bsBidOrigin - ubAskOrigin > 0) {
    console.log(
      `${coin}업비트 ${ubAskOrigin} 매수, 빗썸 ${bsBidOrigin} 매도 // 차액 ${
        bsBidOrigin - ubAskOrigin
      }`
    );
  } else {
    console.log(`${coin}불발!`);
  }
  // try {
  //   await client.trading.create({
  //     data: {
  //       bidShop: UBBIT,
  //       bidPrice: 2000,
  //       bidFee: 10,
  //       askShop: BITTHUMB,
  //       askPrice: 2100,
  //       askFee: 20,
  //       difference: 100,
  //       netIncome: 70,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error)
  // }
>>>>>>> 4ea44874578f7860c4e4156db9ed36c220985ad8
};

test();

const requestApi = () => setInterval(test, 1000);

<<<<<<< HEAD
// requestApi();
=======
requestApi();

//bid 매수, ask 매도
>>>>>>> 4ea44874578f7860c4e4156db9ed36c220985ad8
