import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/users', (req, res) => {
    try {
        const users = db.prepare('SELECT * FROM users').all()
        res.json(users)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

router.get('/users/:id', (req, res) => {
    try {
        const{id} = req.params
        const jobs = db.prepare(`SELECT * FROM jobs WHERE user_id = ?`).all(id)
        res.json(jobs)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

export default router