/*
  Warnings:

  - Added the required column `fatherName` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `child` ADD COLUMN `fatherName` VARCHAR(191) NOT NULL,
    ADD COLUMN `motherName` VARCHAR(191) NOT NULL;
