require('dotenv').config();

const config = {
    port: process.env.PORT || '5000',
    jwt_secret: process.env.JWT_SECRET || '123456',
};

module.exports = config;