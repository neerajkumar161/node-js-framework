import http from 'http'
import { AppRequest, AppResponse, ErrorHandler, RequestHandler, TMethods } from './../global.d'

class App {
  private server: http.Server
  private routes: Record<string, RequestHandler[]>
  private errorHandler?: ErrorHandler
  constructor() {
    /* We bind the handleRequest method to the current instance using bind(this). 
      This ensures that when the server receives a request, the handleRequest method is called with the correct context 
      (this refers to the current instance of the App class). 
    */
    this.server = http.createServer(this.handleRequest.bind(this))
    this.routes = {} /* Initial routes will be empty */
  }

  use(route: string, ...handlers: RequestHandler[]): void
  use(route: RequestHandler, ...handlers: RequestHandler[]): void
  use(route: ErrorHandler): void
  use(route: string | RequestHandler | ErrorHandler, ...handlers: RequestHandler[]) {
    if (typeof route === 'string') {
      handlers?.forEach((handler) => {
        this.addRoute('ALL', route, handler!)
      })
      return
    } else if (route.length === 3) {
      handlers?.forEach((handler) => {
        if (handler) this.addRoute('ALL', '/', handler)
        else this.addRoute('ALL', '/', route as RequestHandler)
      })
    }

    if (route.length === 4) {
      this.errorHandler = route as ErrorHandler
    }

    return this
  }

  get(route: string, handler: RequestHandler) {
    this.addRoute('GET', route, handler)
    return this
  }

  post(route: string, handler: RequestHandler) {
    this.addRoute('POST', route, handler)
    return this
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

    if (handlers) {
      this.jsonBodyParser(req as AppRequest, () => {
        this.executeHandlers(handlers, req, res)
      })
    } else {
      res.statusCode = 404
      res.end('Not Found')
    }
  }

  private handleRequestError(err: Error, req: AppRequest, res: AppResponse) {
    if (this.errorHandler) {
      this.errorHandler(err, req, res, () => {})
    } else {
      res.statusCode = 500
      res.end('Internal Server Error!')
    }
  }

  private executeHandlers(handlers: RequestHandler[], req: http.IncomingMessage, res: http.ServerResponse) {
    let currentIdx = 0

    const next = (err?: any) => {
      currentIdx++
      if (err) {
        this.handleRequestError(err, req as AppRequest, res)
      } else if (currentIdx < handlers.length) {
        handlers[currentIdx](req as AppRequest, res, next)
      }
    }

    handlers[currentIdx](req as AppRequest, res, next)
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
        console.log('Get Request')
        req.body = {} // if err then we will set empty body object
      }
      callback()
    })
  }
}

export default App
