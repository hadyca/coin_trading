/*
  Warnings:

  - You are about to drop the column `askFee` on the `Trading` table. All the data in the column will be lost.
  - You are about to drop the column `askPrice` on the `Trading` table. All the data in the column will be lost.
  - You are about to drop the column `askShop` on the `Trading` table. All the data in the column will be lost.
  - You are about to drop the column `bidFee` on the `Trading` table. All the data in the column will be lost.
  - You are about to drop the column `bidPrice` on the `Trading` table. All the data in the column will be lost.
  - You are about to drop the column `bidShop` on the `Trading` table. All the data in the column will be lost.
  - Added the required column `buyFee` to the `Trading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyPrice` to the `Trading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyShop` to the `Trading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellFee` to the `Trading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Trading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellShop` to the `Trading` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trading" DROP COLUMN "askFee",
DROP COLUMN "askPrice",
DROP COLUMN "askShop",
DROP COLUMN "bidFee",
DROP COLUMN "bidPrice",
DROP COLUMN "bidShop",
ADD COLUMN     "buyFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "buyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "buyShop" TEXT NOT NULL,
ADD COLUMN     "sellFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sellPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sellShop" TEXT NOT NULL;
