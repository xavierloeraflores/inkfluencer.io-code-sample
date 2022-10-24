import express, { Express, Request, Router } from 'express'
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { prisma } = require('./prisma')
const apiRouter: Router = require('./routes')

dotenv.config()
const server: Express = express()

server.use(morgan('dev'))
server.use(
  cors({
    origin: '*'
    // origin:'http://localhost:3000',
    // origin:'http://inkfluencer.io',
  })
)

server.use(bodyParser.json())

// server.get('/authenticated', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
// })

server.use('/api', apiRouter)

const PORT: number = Number(process.env.PORT) || 5555

server.listen(PORT, async () => {
  console.log(`Server is running on Port: ${PORT}`)
})
