import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all jobs user applied to.
router.get('/',(req,res) => {
    const task = db.prepare("SELECT * FROM jobs WHERE user_id = ?")
    const jobs = task.all(req.userId)
    res.json(jobs)
})

// Create a new job application 
router.post('/', (req,res) => {
    const {job_title, job_description,date_applied} = req.body

    const new_job = db.prepare('INSERT INTO jobs (user_id, job_title, job_description ,date_applied) VALUES (?, ?, ?, ?)')
    const updatedjobs = new_job.run(req.userId,job_title,job_description,date_applied)
    console.log('Added job')
    res.status(201).json({id: updatedjobs.lastInsertRowid})
})

// Edit a job application post
router.put('/:id', (req,res) => {
    const {accepted} = req.body
    const {id} = req.params
    const {page} = req.query
    const strToInt = Number(accepted)
    const updateJob = db.prepare('UPDATE jobs SET accepted = ? WHERE id = ?')
    updateJob.run(strToInt,id)
    res.json({message: "Job edit completed"}) 
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params
    const userId= req.userId
    const rmjob = db.prepare(`DELETE FROM jobs WHERE id = ? AND user_id = ?`)
    rmjob.run(id,userId)
    res.json({message: "delete completed"})
})


export default router 
