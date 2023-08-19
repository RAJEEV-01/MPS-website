/*
  Warnings:

  - Added the required column `timeStamp` to the `childStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `childstats` ADD COLUMN `timeStamp` DATETIME(3) NOT NULL;
