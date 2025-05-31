/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService.js'

const createNew = async (req, res, next) => {
  try {

    // Call the service to create a new card
    const createdCard = await cardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const cardId = req.params.id
    const updatedCard = await cardService.update(cardId, req.body)

    res.status(StatusCodes.OK).json(updatedCard)
  } catch (error) { next(error) }
}

export const cardController = {
  createNew,
  update
}