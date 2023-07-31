const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware para verificar el token de autenticación
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No se proporcionó un token de autenticación' });
    }

    jwt.verify(token.split(' ')[1], config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token de autenticación inválido' });
        }

        req.userId = decoded.userId;
        next();
    });
}

// Obtener todas las ventas (se debe incluir el middleware verifyToken)
router.get('/venta', verifyToken, async (req, res) => {
    try {
        const ventas = await prisma.tbl_venta.findMany();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
});

// Obtener una venta por su ID (se debe incluir el middleware verifyToken)
router.get('/venta/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await prisma.tbl_venta.findUnique({
            where: { id_venta: parseInt(id) },
        });

        if (venta) {
            res.json(venta);
        } else {
            res.status(404).json({ error: 'Venta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
});

// Crear una nueva venta (se debe incluir el middleware verifyToken)
router.post('/venta', verifyToken, async (req, res) => {
    const { id_cliente, tipodocumento_venta, fecharegistro_venta } = req.body;
    try {
        const nuevaVenta = await prisma.tbl_venta.create({
            data: {
                id_cliente,
                tipodocumento_venta,
                fecharegistro_venta,
            },
        });
        res.json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
});

// Actualizar una venta por su ID (se debe incluir el middleware verifyToken)
router.put('/venta/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { id_cliente, tipodocumento_venta, fecharegistro_venta } = req.body;
    try {
        const ventaActualizada = await prisma.tbl_venta.update({
            where: { id_venta: parseInt(id) },
            data: {
                id_cliente,
                tipodocumento_venta,
                fecharegistro_venta,
            },
        });
        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
});

// Eliminar una venta por su ID (se debe incluir el middleware verifyToken)
router.delete('/venta/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const ventaEliminada = await prisma.tbl_venta.delete({
            where: { id_venta: parseInt(id) },
        });
        res.json(ventaEliminada);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
});

module.exports = router;