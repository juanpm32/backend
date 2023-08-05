/*
  Warnings:

  - You are about to drop the column `id_subcategoria` on the `tbl_articulo` table. All the data in the column will be lost.
  - You are about to drop the `tbl_subcategoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_categoria` to the `tbl_articulo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_articulo` DROP FOREIGN KEY `tbl_articulo_id_subcategoria_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_subcategoria` DROP FOREIGN KEY `tbl_subcategoria_id_categoria_fkey`;

-- AlterTable
ALTER TABLE `tbl_articulo` DROP COLUMN `id_subcategoria`,
    ADD COLUMN `id_categoria` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tbl_subcategoria`;

-- AddForeignKey
ALTER TABLE `tbl_articulo` ADD CONSTRAINT `tbl_articulo_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `tbl_categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;
