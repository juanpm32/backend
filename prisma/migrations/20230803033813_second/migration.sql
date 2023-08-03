-- CreateTable
CREATE TABLE `tbl_plansuscripcion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(300) NOT NULL,
    `precio` DOUBLE NOT NULL,

    UNIQUE INDEX `tbl_plansuscripcion_descripcion_key`(`descripcion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_ventasuscripcion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_plansuscripcion` INTEGER NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `tiempo` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_ventasuscripcion` ADD CONSTRAINT `tbl_ventasuscripcion_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_ventasuscripcion` ADD CONSTRAINT `tbl_ventasuscripcion_id_plansuscripcion_fkey` FOREIGN KEY (`id_plansuscripcion`) REFERENCES `tbl_plansuscripcion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
