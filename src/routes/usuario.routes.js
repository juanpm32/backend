import { Router } from 'express';
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/login', async (req, res) => {
    const user = {
        id: 1,
        nombre: 'Juan',
        email: 'juanpm32@gmail.com'
    }

    jwt.sign({ user: user }, 'secretKey', (err, token) => {
        res.json({
            token: token
        })
    })
})

router.post('/login/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: 'Post fue creado',
                authData: authData
            })
        }
    })


})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

export default router;