/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {

    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}