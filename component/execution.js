import client from "../client";

export default async function execution(coin, ubResult, bsResult) {
  // axios.post(url, {
  //   chat_id: process.env.TELEGRAM_ID,
  //   // text: `업비트 ${ubBidOrigin} 매도, 빗썸 ${bsAskOrigin} 매수 // 차액 ${
  //   //   ubBidOrigin - bsAskOrigin
  //   // }`,
  //   text: `안녕 셩준아`,
  // });

  const UPBIT_FEE = 0.0005; // 최소 주문 5000원  0.0005;
  const BITTHUMB_FEE = 0.0005; // 최소 주문 500원, 쿠폰 적용 시, 0.0004 && 미 적용시 0.0025
  const everageFee = (UPBIT_FEE + BITTHUMB_FEE) / 2;

  const UBBIT = "UB_BIT";
  const BITTHUMB = "BIT_THUMB";

  const ubAskOrigin = parseFloat(ubResult.ask_price);
  const ubBidOrigin = parseFloat(ubResult.bid_price);

  const bsAskOrigin = parseFloat(bsResult.ask_price);
  const bsBidOrigin = parseFloat(bsResult.bid_price);

  const ubAskWithFee = ubAskOrigin * UPBIT_FEE;
  const ubBidWithFee = ubBidOrigin * UPBIT_FEE;
  const bsAskwithFee = bsAskOrigin * BITTHUMB_FEE;
  const bsBidwithFee = bsBidOrigin * BITTHUMB_FEE;

  if ((ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin) > everageFee) {
    console.log(
      `${coin}빗썸 ${bsAskOrigin} 매수, 업비트 ${ubBidOrigin} 매도 // 차액 ${
        ubBidOrigin - bsAskOrigin
      }`
    );
    try {
      // 1) 빗썸 매수, 업비트 매도 post 날리기,
      // 2) 위 post 결과 값으로 아래 DB에 저장
      await client.trading.create({
        data: {
          coin,
          buyShop: BITTHUMB,
          buyPrice: bsAskOrigin, //실제 결과 값으로 교체
          buyFee: bsAskwithFee,
          sellShop: UBBIT,
          sellPrice: ubBidOrigin, //실제 결과 값으로 교체
          sellFee: ubBidWithFee,
          difference: ubBidOrigin - bsAskOrigin, //실제 결과 값으로 교체
          netIncome: ubBidOrigin - bsAskOrigin - (ubBidWithFee + bsAskwithFee), //실제 결과 값으로 교체
          difRatio: (ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin), //실제 결과 값으로 교체
        },
      });
      //3)텔레그램 메시지 날리기
    } catch (error) {
      console.log("BS buying, UB sell error:", error);
    }
  } else if (
    (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin) >
    everageFee
  ) {
    console.log(
      `${coin}업비트 ${ubAskOrigin} 매수, 빗썸 ${bsBidOrigin} 매도 // 차액 ${
        bsBidOrigin - ubAskOrigin
      }`
    );
    try {
      // 1) 업비트 매수, 빗썸 매도 post 날리기,
      // 2) 위 post 결과 값으로 아래 DB에 저장
      await client.trading.create({
        data: {
          coin,
          buyShop: UBBIT,
          buyPrice: ubAskOrigin, //실제 결과 값으로 교체
          buyFee: ubAskWithFee,
          sellShop: BITTHUMB,
          sellPrice: bsBidOrigin, //실제 결과 값으로 교체
          sellFee: bsBidwithFee,
          difference: bsBidOrigin - ubAskOrigin, //실제 결과 값으로 교체
          netIncome: bsBidOrigin - ubAskOrigin - (ubAskWithFee + bsBidwithFee), //실제 결과 값으로 교체
          difRatio: (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin), //실제 결과 값으로 교체
        },
      });
      //3)텔레그램 메시지 날리기
    } catch (error) {
      console.log("UB buying, BS sell error:", error);
    }
  } else {
    console.log(`${coin}불발!`);
  }
}
