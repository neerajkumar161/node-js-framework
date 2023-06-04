import http from 'http'
import { AppRequest, RequestHandler, TMethods } from './../global.d'


class App {
  private server: http.Server
  private routes: Record<string, RequestHandler[]>

  constructor() {
    /* We bind the handleRequest method to the current instance using bind(this). 
      This ensures that when the server receives a request, the handleRequest method is called with the correct context 
      (this refers to the current instance of the App class). 
    */
    this.server = http.createServer(this.handleRequest.bind(this))
    this.routes = {} /* Initial routes will be empty */
  }

  use(route: string, handler: RequestHandler) {
    this.addRoute('ALL', route, handler)
  }

  get(route: string, handler: RequestHandler) {
    this.addRoute('GET', route, handler)
  }

  post(route: string, handler: RequestHandler) {
    this.addRoute('POST', route, handler)
  }

  listen(port: number, callback?: () => void) {
    this.server.listen(port, callback)
  }

  private addRoute(method: TMethods, route: string, handler: RequestHandler) {
    const routeKey = `${method}:${route}`
    this.routes[routeKey] = this.routes[routeKey] || []
    this.routes[routeKey].push(handler)
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const { url, method } = req
    const routeKey = `${method}:${url}`

    const handlers = this.routes[routeKey] || this.routes[`ALL:${url}`]

    console.log('All Route Handler', this.routes)
    console.log('Handlers', handlers)
    if (handlers) {
      /* Assertion because without parsing we've no req.body */
      this.jsonBodyParser(req as AppRequest, () => {
        handlers.forEach((handler) => handler(req as AppRequest, res))
      })
    } else {
      res.statusCode = 404
      res.end('Not Found')
    }
  }

  private jsonBodyParser(req: AppRequest, callback: () => void) {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        req.body = JSON.parse(body)
      } catch (error) {
        console.log('Error in jsonBodyParser', error)
        req.body = {} // if err then we will set empty body object
      }
      callback()
    })
  }
}

export default App
