-- CreateTable
CREATE TABLE "Trading" (
    "id" SERIAL NOT NULL,
    "bidShop" TEXT NOT NULL,
    "bidPrice" INTEGER NOT NULL,
    "bidFee" INTEGER NOT NULL,
    "askShop" TEXT NOT NULL,
    "askPrice" INTEGER NOT NULL,
    "askFee" INTEGER NOT NULL,
    "difference" INTEGER NOT NULL,
    "netIncome" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trading_pkey" PRIMARY KEY ("id")
);
