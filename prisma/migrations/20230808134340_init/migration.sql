-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` CHAR(10) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
