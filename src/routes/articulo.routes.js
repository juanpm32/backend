const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: articulo
 *   description: Operaciones relacionadas con los articulos
 */

/**
 * @swagger
 * /api/articulo:
 *   get:
 *     summary: Obtiene todos los articulos
 *     tags: [Articulo]
 *     responses:
 *       200:
 *         description: Lista de articulos
 */

// Obtener todos los artículos
router.get('/articulo', async (req, res) => {
    try {
        const articulos = await prisma.tbl_articulo.findMany();
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los artículos' });
    }
});

// Obtener un artículo por su ID
router.get('/articulo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const articulo = await prisma.tbl_articulo.findUnique({
            where: { id_articulo: parseInt(id) },
        });

        if (articulo) {
            res.json(articulo);
        } else {
            res.status(404).json({ error: 'Artículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el artículo' });
    }
});

// Crear un nuevo artículo
router.post('/articulo', async (req, res) => {
    const {
        id_categoria,
        nombre_articulo,
        descripcion_articulo,
        talla_articulo,
        color_articulo,
        precio_articulo,
        marca_articulo,
        stock_articulo,
        imagen_articulo,
    } = req.body;
    try {
        const nuevoArticulo = await prisma.tbl_articulo.create({
            data: {
                id_categoria,
                nombre_articulo,
                descripcion_articulo,
                talla_articulo,
                color_articulo,
                precio_articulo,
                marca_articulo,
                stock_articulo,
                imagen_articulo,
            },
        });
        res.json(nuevoArticulo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el artículo' });
    }
});

// Actualizar un artículo por su ID
router.put('/articulo/:id', async (req, res) => {
    const { id } = req.params;
    const {
        id_categoria,
        nombre_articulo,
        descripcion_articulo,
        talla_articulo,
        color_articulo,
        precio_articulo,
        marca_articulo,
        stock_articulo,
        imagen_articulo,
    } = req.body;
    try {
        const articuloActualizado = await prisma.tbl_articulo.update({
            where: { id_articulo: parseInt(id) },
            data: {
                id_categoria,
                nombre_articulo,
                descripcion_articulo,
                talla_articulo,
                color_articulo,
                precio_articulo,
                marca_articulo,
                stock_articulo,
                imagen_articulo,
            },
        });
        res.json(articuloActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el artículo' });
    }
});

// Eliminar un artículo por su ID
router.delete('/articulo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const articuloEliminado = await prisma.tbl_articulo.delete({
            where: { id_articulo: parseInt(id) },
        });
        res.json(articuloEliminado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el artículo' });
    }
});

module.exports = router;