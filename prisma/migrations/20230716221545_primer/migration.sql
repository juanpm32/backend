/*
  Warnings:

  - You are about to drop the `entrenador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portafolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `turno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `entrenador` DROP FOREIGN KEY `Entrenador_idturno_fkey`;

-- DropTable
DROP TABLE `entrenador`;

-- DropTable
DROP TABLE `portafolio`;

-- DropTable
DROP TABLE `turno`;

-- CreateTable
CREATE TABLE `tbl_portafolio` (
    `id_portafolio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_portafolio` VARCHAR(191) NOT NULL,
    `descripcion_portafolio` VARCHAR(500) NOT NULL,
    `imagen_portafolio` VARCHAR(300) NOT NULL,
    `fecharegistro_portafolio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado_portafolio` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_portafolio_nombre_portafolio_key`(`nombre_portafolio`),
    PRIMARY KEY (`id_portafolio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_turno` (
    `id_turno` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion_turno` VARCHAR(500) NOT NULL,
    `horario_turno` VARCHAR(50) NOT NULL,
    `estado_turno` INTEGER NOT NULL,

    PRIMARY KEY (`id_turno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_entrenador` (
    `id_entrenador` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_entrenador` VARCHAR(100) NOT NULL,
    `especialidad_entrenador` VARCHAR(100) NOT NULL,
    `sexo_entrenador` CHAR(1) NOT NULL,
    `imagen_entrenador` VARCHAR(300) NOT NULL,
    `estado_entrenador` INTEGER NOT NULL,
    `idturno` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_entrenador_nombre_entrenador_key`(`nombre_entrenador`),
    PRIMARY KEY (`id_entrenador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_entrenador` ADD CONSTRAINT `tbl_entrenador_idturno_fkey` FOREIGN KEY (`idturno`) REFERENCES `tbl_turno`(`id_turno`) ON DELETE RESTRICT ON UPDATE RESTRICT;
