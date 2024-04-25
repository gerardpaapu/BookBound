import express from 'express'
import * as Path from 'node:path'

import bookRoutes from './routes/books'
import { searchHandler } from './routes/external'

const server = express()

server.use(express.json())

server.use('/books', bookRoutes)
server.use('/external', searchHandler)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
