const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las subcategorías
router.get('/subcategoria', async (req, res) => {
    try {
        const subcategorias = await prisma.tbl_subcategoria.findMany();
        res.json(subcategorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las subcategorías' });
    }
});

// Obtener una subcategoría por su ID
router.get('/subcategoria/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const subcategoria = await prisma.tbl_subcategoria.findUnique({
            where: { id_subcategoria: parseInt(id) },
        });

        if (subcategoria) {
            res.json(subcategoria);
        } else {
            res.status(404).json({ error: 'Subcategoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la subcategoría' });
    }
});

// Crear una nueva subcategoría
router.post('/subcategoria', async (req, res) => {
    const { id_categoria, descripcion_subcategoria } = req.body;
    try {
        const nuevaSubcategoria = await prisma.tbl_subcategoria.create({
            data: {
                id_categoria,
                descripcion_subcategoria,
            },
        });
        res.json(nuevaSubcategoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la subcategoría' });
    }
});

// Actualizar una subcategoría por su ID
router.put('/subcategoria/:id', async (req, res) => {
    const { id } = req.params;
    const { id_categoria, descripcion_subcategoria } = req.body;
    try {
        const subcategoriaActualizada = await prisma.tbl_subcategoria.update({
            where: { id_subcategoria: parseInt(id) },
            data: {
                id_categoria,
                descripcion_subcategoria,
            },
        });
        res.json(subcategoriaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la subcategoría' });
    }
});

// Eliminar una subcategoría por su ID
router.delete('/subcategoria/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const subcategoriaEliminada = await prisma.tbl_subcategoria.delete({
            where: { id_subcategoria: parseInt(id) },
        });
        res.json(subcategoriaEliminada);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la subcategoría' });
    }
});

module.exports = router;