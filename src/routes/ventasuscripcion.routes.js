const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las ventas de suscripción
router.get('/ventasuscripcion', async (req, res) => {
    try {
        const ventasSuscripcion = await prisma.tbl_ventasuscripcion.findMany();
        res.json(ventasSuscripcion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas de suscripción' });
    }
});

// Obtener una venta de suscripción por su ID
router.get('/ventasuscripcion/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const ventaSuscripcion = await prisma.tbl_ventasuscripcion.findUnique({
            where: { id: parseInt(id) },
        });

        if (ventaSuscripcion) {
            res.json(ventaSuscripcion);
        } else {
            res.status(404).json({ message: 'Venta de suscripción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la venta de suscripción' });
    }
});

// Crear una nueva venta de suscripción
router.post('/ventasuscripcion', async (req, res) => {
    const { id_plansuscripcion, id_cliente, tiempo, precio } = req.body;

    try {
        const nuevaVentaSuscripcion = await prisma.tbl_ventasuscripcion.create({
            data: { id_plansuscripcion, id_cliente, tiempo, precio },
        });
        res.json(nuevaVentaSuscripcion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la venta de suscripción' });
    }
});

// Actualizar una venta de suscripción por su ID
router.put('/ventasuscripcion/:id', async (req, res) => {
    const { id } = req.params;
    const { id_plansuscripcion, id_cliente, tiempo, precio } = req.body;

    try {
        const ventaSuscripcionActualizada = await prisma.tbl_ventasuscripcion.update({
            where: { id: parseInt(id) },
            data: { id_plansuscripcion, id_cliente, tiempo, precio },
        });
        res.json(ventaSuscripcionActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la venta de suscripción' });
    }
});

// Eliminar una venta de suscripción por su ID
router.delete('/ventasuscripcion/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const ventaSuscripcionEliminada = await prisma.tbl_ventasuscripcion.delete({
            where: { id: parseInt(id) },
        });
        res.json(ventaSuscripcionEliminada);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta de suscripción' });
    }
});

module.exports = router;