import accountsUp from "./logic/accounts/accountsUB";
import orderbookBS from "./logic/orderbook/orderbookBS";
import orderbookUB from "./logic/orderbook/orderbookUB";

const UPBIT_FEE = 0.0005; // 최소 주문 5000원
const BITTHUMB_FEE = 0.0025; // 최소 주문 500원, 쿠폰 적용 시, 0.0004 && 미 적용시 0.0025

// accountsUp();

const test = async () => {
  const ubResult = await orderbookUB("KRW-ETC");
  const bsResult = await orderbookBS("ETC_KRW");

  const ubAskOrigin = ubResult.ask_price;
  const ubBidOrigin = ubResult.bid_price;

  const bsAskOrigin = bsResult.data.asks[0].price;
  const bsBidOrigin = bsResult.data.bids[0].price;

  console.log("업비트 매도가", ubAskOrigin);
  console.log("업비트 매수가", ubBidOrigin);

  console.log("빗썸 매도가", bsAskOrigin);
  console.log("빗썸 매수가", bsBidOrigin);
  const ubAsk = ubResult.ask_price * UPBIT_FEE;
  const ubBid = ubResult.bid_price * UPBIT_FEE;

  const bsAsk = bsResult.data.asks[0].price * BITTHUMB_FEE;
  const bsBid = bsResult.data.bids[0].price * BITTHUMB_FEE;

  //   console.log("업비트 매도가(수수료 적용)", ubAsk);
  //   console.log("업비트 매수가(수수료 적용)", ubBid);

  //   console.log("빗썸 매도가(수수료 적용)", bsAsk);
  //   console.log("빗썸 매수가(수수료 적용)", bsBid);

  //   console.log("업비트 매수, 빗썸 매도 차액", ubBid - bsAsk);
  //   console.log("업비트 매도, 빗썸 매수 차액", bsAsk - ubBid);

  //   if (ubBid - bsAsk > 0) {
  //     // 실행 : 업비트 매수, 빗썸에 매도
  //     console.log("업비트 매수, 빗썸 매도 차액", ubBid - bsAsk);
  //   } else {
  //     //실행 : 업비트 매도, 빗썸 매수
  //     console.log("업비트 매도, 빗썸 매수 차액", bsAsk - ubBid);
  //   }
};

test();

const requestApi = () => setInterval(test, 1000);

// requestApi();

//bid 매수, ask 매도
