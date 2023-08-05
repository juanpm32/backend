// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de mi API con Swagger',
        },
        basePath: '/',
    },
    apis: ['./src/routes/*.js'], // Ruta a los archivos de las rutas de tu CRUD
};

const specs = swaggerJsdoc(options);

module.exports = specs;
