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


router.delete('/deleteAll', (req,res) => {
    try {
        const nonadminusers= db.prepare(`SELECT * FROM users `).all()
        const deletejobs = db.prepare(`DELETE FROM jobs WHERE user_id = ?`)
        nonadminusers.forEach(element => {
            if (element.is_admin == 0 ) {
                deletejobs.run(element.id)
            }
        });

        const users = db.prepare(`DELETE FROM users WHERE is_admin = 0`)
        users.run()
        res.status(200).json({message:'Succeful deletion of all users'})
    } catch(err) {
        res.status(501).json({error:err.message})
    }
})

export default router