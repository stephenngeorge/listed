import { Router } from 'express'

import pool from '../db'

const router = Router()

router.get('/', (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('SELECT * FROM users')
            .then(results => {
                client.release()
                res.send(results.rows)
            })
            .catch(e => {
                client.release()
                res.status(400).json({ type: "ERROR", err: e.stack })
            })
        })
})

router.post('/:username', async (req, res) => {
    pool.connect()
        .then(client => {
            return client.query('INSERT INTO users(username) VALUES($1)', [req.params.username])
            .then(result => {
                client.release()
                res.send(result)
            })
            .catch(e => {
                client.release()
                res.status(400).json({ type: "ERROR", err: e.stack })
            })
        })
})

export default router