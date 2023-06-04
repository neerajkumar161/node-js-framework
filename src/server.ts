import App from '.'

const app = new App()

app.use('/health', (req, res) => {
  console.log(req.url)
  res.end('Server is working fine!!!')
})

app.get('/getRoute', (req, res) => {
  console.log('Im in getRoute', req.body)
  res.end('Im in getRoute')
})

app.post('/postRoute', (req, res) => {
  console.log('PostRoute', req.body)
  res.end('PostROute')
})

app.listen(3400, () => {
  console.log('Server is listening on port 3400!')
})
