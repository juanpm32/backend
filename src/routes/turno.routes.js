import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/turno', async (req, res) => {
    const data = await prisma.tbl_turno.findMany({
        include: {
            entrenador: true
        }
    });
    res.json(data)
})

router.get("/turno/:id", async (req, res) => {
    const data = await prisma.tbl_turno.findUnique({
        where: {
            id_turno: parseInt(req.params.id)
        }
    })
    if (!data)
        return res.status(404).json({ error: "Turno no encontrado" });
    return res.json(data)
})

router.post('/turno', async (req, res) => {
    const newData = await prisma.tbl_turno.create({
        data: req.body
    })
    res.json(newData)
})

router.put("/turno/:id", async (req, res) => {
    const data = await prisma.tbl_turno.update({
        where: {
            id_turno: parseInt(req.params.id)
        },
        data: req.body
    })
    res.json(data)
})

router.delete("/turno/:id", async (req, res) => {
    const data = await prisma.tbl_turno.delete({
        where: {
            id_turno: parseInt(req.params.id)
        }
    })
    if (!data)
        return res.status(404).json({ error: "Turno no encontrado" });
    return res.json(data)
})

export default router;