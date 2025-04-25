/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list boards' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'POST: API create new board' })
  })

export const boardRoutes = Router