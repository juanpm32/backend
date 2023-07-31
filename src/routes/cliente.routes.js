const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
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

// Crear un nuevo cliente (se debe incluir el middleware hashPassword)
router.post('/cliente', verifyToken, async (req, res) => {
    try {
        const { nombre_cliente, numerodocumento_cliente, login, clave, email } = req.body;

        // Encriptar la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(clave, 10);

        const nuevoCliente = await prisma.tbl_cliente.create({
            data: {
                nombre_cliente,
                numerodocumento_cliente,
                login,
                clave: hashedPassword,
                email,
            },
        });
        res.json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Obtener todos los clientes (se debe incluir el middleware verifyToken)
router.get('/cliente', verifyToken, async (req, res) => {
    try {
        const clientes = await prisma.tbl_cliente.findMany();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

// Obtener un cliente por su ID (se debe incluir el middleware verifyToken)
router.get('/cliente/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await prisma.tbl_cliente.findUnique({
            where: { id: parseInt(id) },
        });

        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
});

// Actualizar un cliente por su ID (se debe incluir el middleware hashPassword)
router.put('/cliente/:id', verifyToken, hashPassword, async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre_cliente, numerodocumento_cliente, login, clave, email } = req.body;

        // Encriptar la contraseña antes de actualizarla en la base de datos
        const hashedPassword = await bcrypt.hash(clave, 10);

        const clienteActualizado = await prisma.tbl_cliente.update({
            where: { id: parseInt(id) },
            data: {
                nombre_cliente,
                numerodocumento_cliente,
                login,
                clave: hashedPassword,
                email,
            },
        });
        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// Eliminar un cliente por su ID (se debe incluir el middleware verifyToken)
router.delete('/cliente/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const clienteEliminado = await prisma.tbl_cliente.delete({
            where: { id: parseInt(id) },
        });
        res.json(clienteEliminado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

module.exports = router;