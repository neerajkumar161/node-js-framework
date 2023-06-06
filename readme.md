# Nodejs-Framework

This is a lightweight, minimal and custom [Express](https://github.com/expressjs/express)-like library implemented in TypeScript, without any additional libraries, providing basic functionality for building web applications.

## Features

- Middleware support for handling HTTP requests
- Routing based on URL and HTTP method
- Error handling middleware
- Built-in server using the Node.js `http` module

## Installation

To use the library in your project, you can install it via npm. Run the following command:

```shell
npm install nodejs-framework    // NOT uploaded yet
```

## Usage
Import the library and create an instance of the App class:

```ts
import App from './';

const app = new App();

app.listen(3400, () => {
  console.log('Server is listening on port 3400!')
})
```

## Middleware
You can register middleware functions to be executed for every request using the app.use method:

```ts
app.use('/health', (req, res) => {
  console.log(req.url)
  res.end('Server is working fine!!!')
})
```

## Route Handlers
Define route handlers using the app.get and app.post methods:

```ts
app.get('/getRoute', (req, res) => {
  console.log('Im in getRoute', req.body)
  res.end('Im in getRoute')
})

app.post('/postRoute', (req, res) => {
  console.log('PostRoute', req.body)
  res.end('PostRoute')
})
```
## API Reference

### 

```ts
app.use(route: string, handler: RequestHandler): void
```

Registers middleware to be executed for all requests or for a specific route.

- `route` (required): The route URL for the middleware. If not provided, it will be registered for all routes.
- `handler`: The middleware function.

### 
```ts
app.get(route: string, handler: RequestHandler): void
```

Registers a route handler for HTTP GET requests.

- `route`: The route URL pattern.
- `handler`: The route handler function.

### 
```ts
app.post(route: string, handler: RequestHandler): void
```

Registers a route handler for HTTP POST requests.

- `route`: The route URL pattern.
- `handler`: The route handler function.

### 
```ts
app.listen(port: number, callback?: () => void): void
```

Starts the server and listens for incoming requests on the specified port.

- `port`: The port number to listen on.
- `callback` (optional): A function to be called when the server starts listening.


## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
[Neeraj Kumar](https://www.github.com/neerajkumar161)