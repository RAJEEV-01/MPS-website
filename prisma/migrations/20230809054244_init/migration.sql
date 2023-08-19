/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `employeeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `employeeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`employeeId`);

-- CreateTable
CREATE TABLE `Child` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `aadharNumber` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` DECIMAL(10, 2) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
