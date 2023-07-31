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

// Obtener todos los detalles de venta (se debe incluir el middleware verifyToken)
router.get('/ventadetalle', verifyToken, async (req, res) => {
    try {
        const detallesVenta = await prisma.tbl_detalleventa.findMany();
        res.json(detallesVenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles de venta' });
    }
});

// Obtener un detalle de venta por su ID (se debe incluir el middleware verifyToken)
router.get('/ventadetalle/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const detalleVenta = await prisma.tbl_detalleventa.findUnique({
            where: { id_detalleventa: parseInt(id) },
        });

        if (detalleVenta) {
            res.json(detalleVenta);
        } else {
            res.status(404).json({ error: 'Detalle de venta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el detalle de venta' });
    }
});

// Crear un nuevo detalle de venta (se debe incluir el middleware verifyToken)
router.post('/ventadetalle', verifyToken, async (req, res) => {
    const { id_venta, id_articulo, cantidad_articulo, precio_articulo } = req.body;
    try {
        const nuevoDetalleVenta = await prisma.tbl_detalleventa.create({
            data: {
                id_venta,
                id_articulo,
                cantidad_articulo,
                precio_articulo,
            },
        });
        res.json(nuevoDetalleVenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el detalle de venta' });
    }
});

// Actualizar un detalle de venta por su ID (se debe incluir el middleware verifyToken)
router.put('/ventadetalle/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { id_venta, id_articulo, cantidad_articulo, precio_articulo } = req.body;
    try {
        const detalleVentaActualizado = await prisma.tbl_detalleventa.update({
            where: { id_detalleventa: parseInt(id) },
            data: {
                id_venta,
                id_articulo,
                cantidad_articulo,
                precio_articulo,
            },
        });
        res.json(detalleVentaActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el detalle de venta' });
    }
});

// Eliminar un detalle de venta por su ID (se debe incluir el middleware verifyToken)
router.delete('/ventadetalle/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const detalleVentaEliminado = await prisma.tbl_detalleventa.delete({
            where: { id_detalleventa: parseInt(id) },
        });
        res.json(detalleVentaEliminado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el detalle de venta' });
    }
});

module.exports = router;