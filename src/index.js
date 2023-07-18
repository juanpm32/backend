import express from 'express'
import cors from 'cors'

import portafolioRoutes from './routes/portafolio.routes.js';
import entrenadorRoutes from './routes/entrenador.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", portafolioRoutes);
app.use("/api", entrenadorRoutes);
app.use("/api", usuarioRoutes);

app.listen(5001, () => {
    console.log("http://localhost:5001")
})
