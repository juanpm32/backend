import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/portafolio', async (req, res) => {
    const data = await prisma.tbl_portafolio.findMany();
    res.json(data)
})

router.get("/portafolio/:id", async (req, res) => {
    const data = await prisma.tbl_portafolio.findUnique({
        where: {
            id_portafolio: parseInt(req.params.id)
        }
    })
    if (!data)
        return res.status(404).json({ error: "Portafolio no encontrado" });
    return res.json(data)
})

router.post('/portafolio', async (req, res) => {
    const newData = await prisma.tbl_portafolio.create({
        data: req.body
    })
    res.json(newData)
})

router.put("/portafolio/:id", async (req, res) => {
    const data = await prisma.tbl_portafolio.update({
        where: {
            id_portafolio: parseInt(req.params.id)
        },
        data: req.body
    })
    res.json(data)
})

router.delete("/portafolio/:id", async (req, res) => {
    const data = await prisma.tbl_portafolio.delete({
        where: {
            id_portafolio: parseInt(req.params.id)
        }
    })
    if (!data)
        return res.status(404).json({ error: "Portafolio no encontrado" });
    return res.json(data)
})

export default router;