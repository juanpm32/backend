const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: portafolio
 *   description: Operaciones relacionadas con los articulos
 */

/**
 * @swagger
 * /api/portafolios:
 *   get:
 *     summary: Obtiene todos los portafolios
 *     tags: [Articulo]
 *     responses:
 *       200:
 *         description: Lista de portafolios
 */

// Obtener todos los portafolios
router.get('/portafolios', async (req, res) => {
    try {
        const portafolios = await prisma.tbl_portafolio.findMany();
        res.json(portafolios);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener la lista de portafolios.' });
    }
});

// Obtener un portafolio por ID
router.get('/portafolios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const portafolio = await prisma.tbl_portafolio.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!portafolio) {
            return res.status(404).json({ error: 'Portafolio no encontrado.' });
        }

        res.json(portafolio);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el portafolio.' });
    }
});

// Crear un nuevo portafolio
router.post('/portafolios', async (req, res) => {
    try {
        const { nombre, descripcion, imagen } = req.body;

        const portafolio = await prisma.tbl_portafolio.create({
            data: {
                nombre,
                descripcion,
                imagen,
            },
        });

        res.status(201).json(portafolio);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el portafolio.' });
    }
});

// Actualizar un portafolio por ID
router.put('/portafolios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, imagen } = req.body;

        const portafolio = await prisma.tbl_portafolio.update({
            where: {
                id: parseInt(id),
            },
            data: {
                nombre,
                descripcion,
                imagen,
            },
        });

        res.json(portafolio);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar el portafolio.' });
    }
});

// Eliminar un portafolio por ID
router.delete('/portafolios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tbl_portafolio.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({ message: 'Portafolio eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el portafolio.' });
    }
});

module.exports = router;