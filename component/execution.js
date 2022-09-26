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
  const targetRatio = (UPBIT_FEE + BITTHUMB_FEE) / 2;

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

  if ((ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin) > targetRatio) {
    console.log(
      `${coin}빗썸 ${bsAskOrigin} 매수, 업비트 ${ubBidOrigin} 매도 // 차액 ${
        ubBidOrigin - bsAskOrigin
      }`
    );
    try {
      const exist = await client.trading.findFirst({
        where: {
          difRatio: (ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin),
        },
      });
      if (!exist) {
        await client.trading.create({
          data: {
            coin,
            buyShop: BITTHUMB,
            buyPrice: bsAskOrigin,
            buyFee: bsAskwithFee,
            sellShop: UBBIT,
            sellPrice: ubBidOrigin,
            sellFee: ubBidWithFee,
            difference: ubBidOrigin - bsAskOrigin,
            netIncome:
              ubBidOrigin - bsAskOrigin - (ubBidWithFee + bsAskwithFee),
            difRatio: (ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin),
          },
        });
      }
    } catch (error) {
      console.log("에러메시지3", error);
    }
  } else if (
    (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin) >
    targetRatio
  ) {
    console.log(
      `${coin}업비트 ${ubAskOrigin} 매수, 빗썸 ${bsBidOrigin} 매도 // 차액 ${
        bsBidOrigin - ubAskOrigin
      }`
    );
    try {
      const exist = await client.trading.findFirst({
        where: {
          difRatio: (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin),
        },
      });
      if (!exist) {
        await client.trading.create({
          data: {
            coin,
            buyShop: UBBIT,
            buyPrice: ubAskOrigin,
            buyFee: ubAskWithFee,
            sellShop: BITTHUMB,
            sellPrice: bsBidOrigin,
            sellFee: bsBidwithFee,
            difference: bsBidOrigin - ubAskOrigin,
            netIncome:
              bsBidOrigin - ubAskOrigin - (ubAskWithFee + bsBidwithFee),
            difRatio: (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin),
          },
        });
      }
    } catch (error) {
      console.log("에러메시지4", error);
    }
  } else {
    console.log(`${coin}불발!`);
  }
}
