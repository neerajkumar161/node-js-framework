import { IncomingMessage, ServerResponse } from 'http'

export interface AppRequest extends IncomingMessage {
  body: any
}

export interface NextFunction {
  /**
   * Send error to error handler
   */
  (err?: any): void
  /**
   * "Break-out" of a router by calling {next('router')};
   * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.router}
   */
  (deferToNext: 'router'): void
  /**
   * "Break-out" of a route by calling {next('route')};
   * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.application}
   */
  (deferToNext: 'route'): void
}

export interface Test {
  use(route: string, ...handlers: RequestHandler[]): void
  use(route: ErrorHandler): void
  use(...handlers: RequestHandler[]): void
}

// export type NextFunction = () => void

export interface AppResponse extends ServerResponse {}

export type RequestHandler = (req: AppRequest, res: AppResponse, next: NextFunction) => void
export type ErrorHandler = (error: any, req: AppRequest, res: AppResponse, next: NextFunction) => void

export type Handler = RequestHandler | ErrorHandler
export type TMethods = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
