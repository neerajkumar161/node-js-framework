import { IncomingMessage } from 'http';

export interface AppRequest extends IncomingMessage {
  body: any
}

export type RequestHandler = (req: AppRequest, res: http.ServerResponse) => void
export type ErrorHandler = (error: Error, req: AppRequest, res: http.ServerResponse) => void
export type ErrorHandler = (error: any, req: AppRequest, res: http.ServerResponse) => void

export type TMethods = 'ALL' | 'GET' | 'POST' | 'PUT' | 'PATCH'