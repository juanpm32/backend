-- CreateTable
CREATE TABLE `Portafolio` (
    `id_portafolio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_portafolio` VARCHAR(191) NOT NULL,
    `descripcion_portafolio` VARCHAR(500) NOT NULL,
    `imagen_portafolio` VARCHAR(300) NOT NULL,
    `fecharegistro_portafolio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado_portafolio` INTEGER NOT NULL,

    UNIQUE INDEX `Portafolio_nombre_portafolio_key`(`nombre_portafolio`),
    PRIMARY KEY (`id_portafolio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turno` (
    `id_turno` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion_turno` VARCHAR(500) NOT NULL,
    `horario_turno` VARCHAR(50) NOT NULL,
    `estado_turno` INTEGER NOT NULL,

    PRIMARY KEY (`id_turno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrenador` (
    `id_entrenador` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_entrenador` VARCHAR(100) NOT NULL,
    `especialidad_entrenador` VARCHAR(100) NOT NULL,
    `sexo_entrenador` CHAR(1) NOT NULL,
    `imagen_entrenador` VARCHAR(300) NOT NULL,
    `estado_entrenador` INTEGER NOT NULL,
    `idturno` INTEGER NOT NULL,

    UNIQUE INDEX `Entrenador_nombre_entrenador_key`(`nombre_entrenador`),
    PRIMARY KEY (`id_entrenador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Entrenador` ADD CONSTRAINT `Entrenador_idturno_fkey` FOREIGN KEY (`idturno`) REFERENCES `Turno`(`id_turno`) ON DELETE RESTRICT ON UPDATE CASCADE;
