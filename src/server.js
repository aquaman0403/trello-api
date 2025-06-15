/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exithook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_v1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'
import socketIo from 'socket.io'
import http from 'http'
import { inviteUserToBoardSocket } from '~/sockets/inviteUserToBoardSocket'

const START_SERVER = () => {
  const app = express()

  // Fix Cache from disk của expressjs

  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    next()
  })

  // Cấu hình cookieParser
  app.use(cookieParser())

  // Cấu hình CORS
  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', APIs_v1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  // Tạo một server mới bọc app của express để làm real-time với socket-io
  const server = http.createServer(app)
  // Khởi tạo biến io và CORS
  const io = socketIo(server, { cors: corsOptions })
  io.on('connection', (socket) => {
    inviteUserToBoardSocket(socket)
  })

  if (env.BUILD_MODE === 'production') {
    // Dùng server.listen thay vì app.listen vì lúc này server đã bao gồm express app và đã config socket.io
    server.listen(process.env.PORT, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at port: ${process.env.PORT}`)
    })
  } else {
    server.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
    })
  }

  exithook(() => CLOSE_DB())
}

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB'))
  .then(() => START_SERVER())
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
    process.exit(0)
  })
