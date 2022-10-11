require("dotenv").config();
import axios from "axios";
import historyBS from "../api/history/historyBS";
import historyUB from "../api/history/historyUB";
import orderLimitBS from "../api/order/orderLimitBS";
import orderUB from "../api/order/orderUB";
import client from "../client";

export default async function exchange(
  coin,
  coinVolume,
  targetRatio,
  ubResult,
  bsResult
) {
  // (UPBIT_FEE + BITTHUMB_FEE) / 2; //수수료 평균
  const UPBIT_FEE = 0.0005; // 기본 수수료
  const BITTHUMB_FEE = 0.0005; // 50만원 쿠폰 적용 수수료

  const UBBIT = "UB_BIT";
  const BITTHUMB = "BIT_THUMB";

  const ubAskOrigin = parseFloat(ubResult.ask_price);
  const ubBidOrigin = parseFloat(ubResult.bid_price);

  const bsAskOrigin = parseFloat(bsResult.ask_price);
  const bsBidOrigin = parseFloat(bsResult.bid_price);

  const ubAskVolume = ubResult.ask_size;
  const ubBidVolume = ubResult.bid_size;

  const bsAskVolume = bsResult.ask_size;
  const bsBidVolume = bsResult.bid_size;

  if (
    (ubBidOrigin - bsAskOrigin) / (ubBidOrigin + bsAskOrigin) > targetRatio &&
    ubBidVolume > coinVolume &&
    bsAskVolume > coinVolume
  ) {
    try {
      // 업비트 매도, 빗썸 매수 실행
      const resultUB = await orderUB(coin, "ask", coinVolume, ubBidOrigin); //지정가 매도

      if (!resultUB.uuid) {
        console.log("Ubbit not enough coins for sell");
        return;
      }

      const resultBS = await orderLimitBS(coin, coinVolume, bsAskOrigin, "bid"); //빗썸 지정가 매수
      // 슬리피지 조건 실행

      // 각 거래소 실제 거래가 조회
      const buyingPriceBS = await historyBS(coin, resultBS.order_id);
      const sellPriceUB = await historyUB(resultUB.uuid);

      //거래 값 텔레그램 메시지 보내기
      await axios({
        url: process.env.TELEGRAM_URL,
        method: "post",
        data: {
          chat_id: process.env.TELEGRAM_ID,
          text: `빗썸 매수: ${buyingPriceBS}\n업비트 매도: ${sellPriceUB}\n차익: ${
            sellPriceUB -
            buyingPriceBS -
            (buyingPriceBS * BITTHUMB_FEE + sellPriceUB * UPBIT_FEE)
          }`,
        },
      });
      //각 거래소 별 실제 거래가 DB 저장
      await client.trading.create({
        data: {
          coin,
          buyShop: BITTHUMB,
          buyPrice: buyingPriceBS,
          buyFee: buyingPriceBS * BITTHUMB_FEE,
          sellShop: UBBIT,
          sellPrice: sellPriceUB,
          sellFee: sellPriceUB * UPBIT_FEE,
          difference: sellPriceUB - buyingPriceBS, //판 가격 - 산 가격
          netIncome:
            sellPriceUB -
            buyingPriceBS -
            (buyingPriceBS * BITTHUMB_FEE + sellPriceUB * UPBIT_FEE), // 판 가격 - 산 가격 -(수수료 총 합)
          difRatio:
            (sellPriceUB - buyingPriceBS) / (sellPriceUB + buyingPriceBS), // 차익/총 거래가
        },
      });
    } catch (error) {
      await axios({
        url: process.env.TELEGRAM_URL,
        method: "post",
        data: {
          chat_id: process.env.TELEGRAM_ID,
          text: "BS buying, UB sell error",
        },
      });
      console.log("BS buying, UB sell error");
    }
  } else if (
    (bsBidOrigin - ubAskOrigin) / (bsBidOrigin + ubAskOrigin) > targetRatio &&
    ubAskVolume > coinVolume &&
    bsBidVolume > coinVolume
  ) {
    try {
      // 빗썸 매도, 업비트 매수 실행
      const resultBS = await orderLimitBS(coin, coinVolume, bsBidOrigin, "ask"); //빗썸 지정가 매도

      if (!resultBS.order_id) {
        console.log("Bithumb not enough coins for sell");
        return;
      }

      const resultUB = await orderUB(coin, "bid", coinVolume, ubAskOrigin); //지정가 매수
      // 슬리피지 조건 실행

      // 각 거래소 실제 거래가 조회
      const buyingPriceUB = await historyUB(resultUB.uuid);
      const sellPriceBS = await historyBS(coin, resultBS.order_id);
      // 최종 값 텔레그램 메시지 보내기
      await axios({
        url: process.env.TELEGRAM_URL,
        method: "post",
        data: {
          chat_id: process.env.TELEGRAM_ID,
          text: `업비트 매수: ${buyingPriceUB}\n빗썸 매도: ${sellPriceBS}\n차익: ${
            sellPriceBS -
            buyingPriceUB -
            (buyingPriceUB * UPBIT_FEE + sellPriceBS * BITTHUMB_FEE)
          }`,
        },
      });
      //각 거래소 별 실제 거래가 DB 저장
      await client.trading.create({
        data: {
          coin,
          buyShop: UBBIT,
          buyPrice: buyingPriceUB,
          buyFee: buyingPriceUB * UPBIT_FEE,
          sellShop: BITTHUMB,
          sellPrice: sellPriceBS,
          sellFee: sellPriceBS * BITTHUMB_FEE,
          difference: sellPriceBS - buyingPriceUB, // 판 가격 - 산 가격
          netIncome:
            sellPriceBS -
            buyingPriceUB -
            (buyingPriceUB * UPBIT_FEE + sellPriceBS * BITTHUMB_FEE), //판 가격 - 산 가격 -(수수료 총 합)
          difRatio:
            (sellPriceBS - buyingPriceUB) / (sellPriceBS + buyingPriceUB), // 차익/총 거래가
        },
      });
    } catch (error) {
      await axios({
        url: process.env.TELEGRAM_URL,
        method: "post",
        data: {
          chat_id: process.env.TELEGRAM_ID,
          text: "UB buying, BS sell error",
        },
      });
      console.log("UB buying, BS sell error");
    }
  } else {
    console.log("trading...");
  }
}
