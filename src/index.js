import express from 'express'
import cors from 'cors'

import portafolioRoutes from './routes/portafolio.routes.js';
import entrenadorRoutes from './routes/entrenador.routes.js';

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", portafolioRoutes);
app.use("/api", entrenadorRoutes);

app.listen(5000, () => {
    console.log("http://localhost:5000")
})
