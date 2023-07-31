const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las categorías
router.get('/categoria', async (req, res) => {
    try {
        const categorias = await prisma.tbl_categoria.findMany();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
});

// Obtener una categoría por su ID
router.get('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await prisma.tbl_categoria.findUnique({
            where: { id_categoria: parseInt(id) },
        });

        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ error: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
});

// Crear una nueva categoría
router.post('/categoria', async (req, res) => {
    const { nombre_categoria } = req.body;
    try {
        const nuevaCategoria = await prisma.tbl_categoria.create({
            data: {
                nombre_categoria,
            },
        });
        res.json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
});

// Actualizar una categoría por su ID
router.put('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria } = req.body;
    try {
        const categoriaActualizada = await prisma.tbl_categoria.update({
            where: { id_categoria: parseInt(id) },
            data: {
                nombre_categoria,
            },
        });
        res.json(categoriaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
});

// Eliminar una categoría por su ID
router.delete('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaEliminada = await prisma.tbl_categoria.delete({
            where: { id_categoria: parseInt(id) },
        });
        res.json(categoriaEliminada);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
});

module.exports = router;
