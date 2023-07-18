-- CreateTable
CREATE TABLE `tbl_portafolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(500) NOT NULL,
    `imagen` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `tbl_portafolio_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_entrenador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `especialidad` VARCHAR(100) NOT NULL,
    `imagen` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `tbl_entrenador_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
