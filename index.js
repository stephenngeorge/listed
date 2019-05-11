import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import mountRoutes from './routes'

const app = express()
// configure middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mount routes
mountRoutes(app)

app.get('/', (req, res) => {
    res.send('welcome to the LISTED backend')
})


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}...`)
})