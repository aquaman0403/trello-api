/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'
import { userRoute } from './userRoute'

const Router = express.Router()

/* Check APIs v2 status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Board API is running',
    status: StatusCodes.OK
  })
})

/* Board APIs */
Router.use('/boards', boardRoute)

/* Cloumn APIs */
Router.use('/columns', columnRoute)

/* Card APIs */
Router.use('/cards', cardRoute)

/* User APIs */
Router.use('/users', userRoute)

export const APIs_v1 = Router