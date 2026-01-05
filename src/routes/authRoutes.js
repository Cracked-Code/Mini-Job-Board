import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import { hash } from 'crypto'


const router = express.Router()
router.post('/register', (req,res) => {
    const {username,password} = req.body
    const hashedpassword = bcrypt.hashSync(password, 8)
    console.log(hashedpassword)

    
    //save the new user and hashed password to the db
    try {
        const insertuser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)   
        const result = insertuser.run(username, hashedpassword)

        const defaultJobName = "Hi, Add your first job application!"
        const defualtJobDesc = "Nothing :("
        const insertJob = db.prepare(`INSERT INTO jobs (user_id, job_title,job_description,date_applied)
            VALUES (?, ?, ? ,? ) `)
        insertJob.run(result.lastInsertRowid,defaultJobName, defualtJobDesc, Date.now())

        //create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET
        , {expiresIn : '24h'})
        res.json({token})
        
        
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login' ,(req,res)  => {
    const {username,password} = req.body
    try {
        const getUser = db.prepare("SELECT * FROM users WHERE username = ?")
        const user = getUser.get(username)

        //Checks username inputted in db
        if (!user) {return res.status(404).send({message: "User not found"})}

        //Checks if password entered matches
        const validpassword = bcrypt.compareSync(password, user.password)
        if (!validpassword) {return res.status(401).send({message:"Inncorrect Password"})}
        
        //Successfull login in
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET
        , {expiresIn : '24h'})
        res.json({token})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
    
})

export default router 
