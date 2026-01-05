import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import debugRoutes from './routes/debugRoutes.js'

const app = express()
const PORT = process.env.PORT || 1235

//Get file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
//Get the directory name form the file path
const __dirname = dirname(__filename)

//Middleware
app.use(express.json())
//Serving up the HTML frile from the public directory.
//Tells express to serve all files from the pubic folder as static assests /file. 
//Any requests for the css files will be resolved to the public directory

app.use(express.static(path.join(__dirname, '../public')))
//Serving up the HTML frile from the public directory.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use('/auth', authRoutes)
app.use('/jobs', authMiddleware ,jobsRoutes)
app.use('/debug' , debugRoutes)



app.listen(PORT ,() => {
    console.log(`Sever started! Listenig on PORT ${PORT}`)
})
