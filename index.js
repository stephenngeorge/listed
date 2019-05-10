import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import models, { sequelize } from './models'

import routes from './routes'

const app = express()
// configure middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    req.context = {
        models
    }
    next()
})

// configure routes
app.use('/test', routes.test)

app.get('/', (req, res) => {
    res.send('welcome to the LISTED backend')
})

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}...`)
    })
})