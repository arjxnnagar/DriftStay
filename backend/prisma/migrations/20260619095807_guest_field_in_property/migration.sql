/*
  Warnings:

  - Added the required column `guests` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "guests" INTEGER NOT NULL;
