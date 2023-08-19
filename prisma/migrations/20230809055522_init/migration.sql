/*
  Warnings:

  - You are about to drop the column `height` on the `child` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `child` DROP COLUMN `height`,
    DROP COLUMN `weight`;
