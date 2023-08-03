const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();

// Middleware para procesar los cuerpos de las peticiones como JSON
app.use(express.json());

// Middleware para permitir peticiones de otros dominios (CORS)
app.use(cors());

// Rutas para usuarios
app.use('/api', require('./routes/usuario.routes'));

// Rutas para entrenadores
app.use('/api', require('./routes/entrenador.routes'));

// Rutas para portafolios
app.use('/api', require('./routes/portafolio.routes'));

// Rutas para articulos
app.use('/api', require('./routes/articulo.routes'));

// Rutas para categorias
app.use('/api', require('./routes/categoria.routes'));

// Rutas para subcategorias
app.use('/api', require('./routes/subcategoria.routes'));

// Rutas para clientes
app.use('/api', require('./routes/cliente.routes'));

// Rutas para ventas
app.use('/api', require('./routes/venta.routes'));

// Rutas para ventadetalle
app.use('/api', require('./routes/ventadetalle.routes'));

// Rutas para planessuscripcion
app.use('/api', require('./routes/ventadetalle.routes'));

// Rutas para ventasuscripcion
app.use('/api', require('./routes/ventasuscripcion.routes'));

// Rutas para plansuscripcion
app.use('/api', require('./routes/plansuscripcion.routes'));

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de mi proyecto!');
});

// Manejo de errores para rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor.' });
});

// Iniciar el servidor
app.listen(config.port, () => {
    console.log(`Servidor iniciado en http://localhost:${config.port}`);
});
