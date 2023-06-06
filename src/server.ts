import App from '.'
import { ErrorHandler } from './../global.d'

const app = new App()

app.use((req, res, next) => {
  console.log('use me as a running handler')
})
app.use(
  '/health',
  (req, res, next) => {
    try {
      console.log('Im first handler of use')
      next()
    } catch (error) {
      next(error)
    }
  },
  (req, res, next) => {
    console.log('Im 2nd Handler of use!')
    res.end('Im from 2nd handler')
  }
)

app.use((req, res, next) => {
  console.log('Handler in line 35 after calling /health route')
})

app.get('/getRoute', (req, res, next) => {
  console.log('Im in getRoute', req.body, next.toString())
  res.end('Im in getRoute')
})

app.post('/postRoute', (req, res, next) => {
  console.log('PostRoute', req.body)
  res.end('PostROute')
})

app.use(((err, req, res, next) => {
  console.log('Error Handler', err)
  res.end('Error occured!')
}) as ErrorHandler)

app.listen(3400, () => {
  console.log('Server is listening on port 3400!')
})
