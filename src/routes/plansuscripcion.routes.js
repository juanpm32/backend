const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Obtener todos los planes de suscripción
router.get('/plansuscripcion', async (req, res) => {
    try {
        const planesSuscripcion = await prisma.tbl_plansuscripcion.findMany();
        res.json(planesSuscripcion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los planes de suscripción' });
    }
});

// Obtener un plan de suscripción por su ID
router.get('/plansuscripcion/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const planSuscripcion = await prisma.tbl_plansuscripcion.findUnique({
            where: { id: parseInt(id) },
        });

        if (planSuscripcion) {
            res.json(planSuscripcion);
        } else {
            res.status(404).json({ message: 'Plan de suscripción no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el plan de suscripción' });
    }
});

// Crear un nuevo plan de suscripción
router.post('/plansuscripcion', async (req, res) => {
    const { descripcion, precio } = req.body;

    try {
        const nuevoPlanSuscripcion = await prisma.tbl_plansuscripcion.create({
            data: { descripcion, precio },
        });
        res.json(nuevoPlanSuscripcion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el plan de suscripción' });
    }
});

// Actualizar un plan de suscripción por su ID
router.put('/plansuscripcion/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion, precio } = req.body;

    try {
        const planSuscripcionActualizado = await prisma.tbl_plansuscripcion.update({
            where: { id: parseInt(id) },
            data: { descripcion, precio },
        });
        res.json(planSuscripcionActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el plan de suscripción' });
    }
});

// Eliminar un plan de suscripción por su ID
router.delete('/plansuscripcion/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const planSuscripcionEliminado = await prisma.tbl_plansuscripcion.delete({
            where: { id: parseInt(id) },
        });
        res.json(planSuscripcionEliminado);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el plan de suscripción' });
    }
});

module.exports = router;
