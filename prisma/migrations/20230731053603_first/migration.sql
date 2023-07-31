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

-- CreateTable
CREATE TABLE `tbl_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `login` VARCHAR(100) NOT NULL,
    `clave` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tbl_usuario_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_articulo` (
    `id_articulo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_subcategoria` INTEGER NOT NULL,
    `nombre_articulo` VARCHAR(100) NOT NULL,
    `descripcion_articulo` VARCHAR(200) NOT NULL,
    `talla_articulo` VARCHAR(50) NOT NULL,
    `color_articulo` VARCHAR(50) NOT NULL,
    `precio_articulo` DOUBLE NOT NULL,
    `marca_articulo` VARCHAR(50) NOT NULL,
    `stock_articulo` INTEGER NOT NULL,
    `imagen_articulo` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id_articulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_subcategoria` (
    `id_subcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_categoria` INTEGER NOT NULL,
    `descripcion_subcategoria` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id_subcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_categoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_cliente` VARCHAR(100) NOT NULL,
    `numerodocumento_cliente` VARCHAR(8) NOT NULL,
    `login` VARCHAR(100) NOT NULL,
    `clave` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tbl_cliente_numerodocumento_cliente_key`(`numerodocumento_cliente`),
    UNIQUE INDEX `tbl_cliente_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_venta` (
    `id_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `tipodocumento_venta` VARCHAR(50) NOT NULL,
    `fecharegistro_venta` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_detalleventa` (
    `id_detalleventa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_venta` INTEGER NOT NULL,
    `id_articulo` INTEGER NOT NULL,
    `cantidad_articulo` INTEGER NOT NULL,
    `precio_articulo` DOUBLE NOT NULL,

    PRIMARY KEY (`id_detalleventa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_articulo` ADD CONSTRAINT `tbl_articulo_id_subcategoria_fkey` FOREIGN KEY (`id_subcategoria`) REFERENCES `tbl_subcategoria`(`id_subcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_subcategoria` ADD CONSTRAINT `tbl_subcategoria_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_venta` ADD CONSTRAINT `tbl_venta_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_detalleventa` ADD CONSTRAINT `tbl_detalleventa_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `tbl_venta`(`id_venta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_detalleventa` ADD CONSTRAINT `tbl_detalleventa_id_articulo_fkey` FOREIGN KEY (`id_articulo`) REFERENCES `tbl_articulo`(`id_articulo`) ON DELETE RESTRICT ON UPDATE CASCADE;
