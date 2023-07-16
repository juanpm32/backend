import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/entrenador', async (req, res) => {
    const data = await prisma.tbl_entrenador.findMany();
    res.json(data)
})

router.get("/entrenador/:id", async (req, res) => {
    const data = await prisma.tbl_entrenador.findUnique({
        where: {
            id_entrenador: parseInt(req.params.id)
        }
    })
    if (!data)
        return res.status(404).json({ error: "Entrenador no encontrado" });
    return res.json(data)
})

router.post('/entrenador', async (req, res) => {
    const newData = await prisma.tbl_entrenador.create({
        data: req.body
    })
    res.json(newData)
})

router.put("/entrenador/:id", async (req, res) => {
    const data = await prisma.tbl_entrenador.update({
        where: {
            id_entrenador: parseInt(req.params.id)
        },
        data: req.body,
        include: {
            turno: true
        }
    })
    res.json(data)
})

router.delete("/entrenador/:id", async (req, res) => {
    const data = await prisma.tbl_entrenador.delete({
        where: {
            id_entrenador: parseInt(req.params.id)
        }
    })
    if (!data)
        return res.status(404).json({ error: "Entrenador no encontrado" });
    return res.json(data)
})

export default router;