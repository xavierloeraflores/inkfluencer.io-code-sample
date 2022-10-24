import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  Router
} from 'express'
const usersRouter: Router = require('./users')
const authRouter: Router = require('./auth')
const apiRouter: Router = Router()

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'Api is under construction'
  })
})
apiRouter.use('/auth', authRouter)
apiRouter.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.log({ req })
    console.error({ error })
    res.status(400)
    res.send(error)
  }
)
module.exports = apiRouter
