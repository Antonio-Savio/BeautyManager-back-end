/*
  Warnings:

  - You are about to alter the column `price` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- DropIndex
DROP INDEX "assignments_userId_key";

-- AlterTable
ALTER TABLE "assignments" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
