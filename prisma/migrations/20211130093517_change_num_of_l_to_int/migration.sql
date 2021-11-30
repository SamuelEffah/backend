/*
  Warnings:

  - You are about to alter the column `numOfListeners` on the `Podcast` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Podcast" ALTER COLUMN "numOfListeners" SET DEFAULT 0,
ALTER COLUMN "numOfListeners" SET DATA TYPE INTEGER;
