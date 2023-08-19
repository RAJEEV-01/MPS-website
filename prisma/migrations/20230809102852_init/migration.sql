-- CreateTable
CREATE TABLE `childStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `height` INTEGER NOT NULL,
    `weight` DECIMAL(10, 2) NOT NULL,
    `childId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
