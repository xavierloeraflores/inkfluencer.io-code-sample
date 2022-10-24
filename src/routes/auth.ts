const { authController } = require('../controllers')
import { Router } from 'express'

const apiRouter: Router = Router()

apiRouter.get('/', authController.healthCheck)

apiRouter.post('/login', authController.login)

apiRouter.post('/register', authController.register)

module.exports = apiRouter
