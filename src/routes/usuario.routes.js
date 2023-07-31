const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No se proporcionó un token de autenticación' });
    }

    jwt.verify(token.split(' ')[1], config.jwt_secret, (err, decoded) => {
        console.log(decoded)
        if (err) {
            return res.status(401).json({ error: 'Token de autenticación inválido' });
        }

        req.userId = decoded.userId;
        next();
    });
}

// Ruta para crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
    try {
        const { nombre, login, clave, email } = req.body;

        // Encriptar la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(clave, 10);

        const usuario = await prisma.tbl_usuario.create({
            data: {
                nombre,
                login,
                clave: hashedPassword,
                email,
            },
        });

        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el usuario.' });
    }
});

// Ruta para autenticar un usuario
router.post('/usuarios/login', async (req, res) => {
    try {
        const { login, clave } = req.body;

        const usuario = await prisma.tbl_usuario.findUnique({
            where: {
                login,
            },
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const validPassword = await bcrypt.compare(clave, usuario.clave);

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Generar un token de autenticación usando jsonwebtoken
        const token = jwt.sign({ id: usuario.id }, config.jwt_secret, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo autenticar al usuario.' });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', verifyToken, async (req, res) => {
    try {
        const usuarios = await prisma.tbl_usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await prisma.tbl_usuario.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el usuario.' });
    }
});

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, login, clave, email } = req.body;

        // Encriptar la contraseña antes de actualizarla en la base de datos
        const hashedPassword = await bcrypt.hash(clave, 10);

        const usuario = await prisma.tbl_usuario.update({
            where: {
                id: parseInt(id),
            },
            data: {
                nombre,
                login,
                clave: hashedPassword,
                email,
            },
        });

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar el usuario.' });
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.tbl_usuario.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el usuario.' });
    }
});

module.exports = router;