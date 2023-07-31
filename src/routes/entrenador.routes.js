const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los entrenadores
router.get('/entrenadores', async (req, res) => {
    try {
        const entrenadores = await prisma.tbl_entrenador.findMany();
        res.json(entrenadores);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener la lista de entrenadores.' });
    }
});

// Obtener un entrenador por ID
router.get('/entrenadores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entrenador = await prisma.tbl_entrenador.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!entrenador) {
            return res.status(404).json({ error: 'Entrenador no encontrado.' });
        }

        res.json(entrenador);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el entrenador.' });
    }
});

// Crear un nuevo entrenador
router.post('/entrenadores', async (req, res) => {
    try {
        const { nombre, especialidad, imagen } = req.body;

        const entrenador = await prisma.tbl_entrenador.create({
            data: {
                nombre,
                especialidad,
                imagen,
            },
        });

        res.status(201).json(entrenador);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el entrenador.' });
    }
});

// Actualizar un entrenador por ID
router.put('/entrenadores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, imagen } = req.body;

        const entrenador = await prisma.tbl_entrenador.update({
            where: {
                id: parseInt(id),
            },
            data: {
                nombre,
                especialidad,
                imagen,
            },
        });

        res.json(entrenador);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar el entrenador.' });
    }
});

// Eliminar un entrenador por ID
router.delete('/entrenadores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tbl_entrenador.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({ message: 'Entrenador eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el entrenador.' });
    }
});

module.exports = router;