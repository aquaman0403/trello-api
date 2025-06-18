/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import { CloudinaryProvider } from '~/providers/CloudinaryProvider.js'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      // Cập nhật lại mảng cardOrderIds trong board truớc khi trả về
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) { throw error }
}

const update = async (cardId, reqBody, cardCoverFile, userInfo) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAd: Date.now()
    }

    let updatedCard = {}

    if (cardCoverFile) {
      // Truong hop upload file to cloudinary
      const uploadResult = await CloudinaryProvider.streamUpload(cardCoverFile.buffer, 'users')
      updatedCard = await cardModel.update(cardId, {
        cover: uploadResult.secure_url
      })
    } else if (updateData.commentToAdd) {
      // Create data comment to add DB
      const commentData = {
        ...updateData.commentToAdd,
        commentedAt: Date.now(),
        userId: userInfo._id,
        userEmail: userInfo.email
      }
      updatedCard = await cardModel.unshiftNewComment(cardId, commentData)
    } else if (updateData.incommingMemberInfo) {
      // Trường hợp ađd hoặc remove thành viên ra khỏi card
      updatedCard = await cardModel.updateMembers(cardId, updateData.incommingMemberInfo)
    } else {
      // Cac truong hop update chung nhu title, description
      updatedCard = await cardModel.update(cardId, updateData)
    }
    return updatedCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew,
  update
}