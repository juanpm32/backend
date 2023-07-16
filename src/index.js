import express from 'express'

import portafolioRoutes from './routes/portafolio.routes.js';
import entrenadorRoutes from './routes/entrenador.routes.js';
import turnoRoutes from './routes/turno.routes.js';

const app = express()

app.use(express.json())

app.use("/api", portafolioRoutes);
app.use("/api", entrenadorRoutes);
app.use("/api", turnoRoutes);

app.listen(5000, () => {
    console.log("http://localhost:5000")
})
