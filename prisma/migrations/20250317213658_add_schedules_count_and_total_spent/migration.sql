-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "schedules_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_spent" DOUBLE PRECISION NOT NULL DEFAULT 0;
