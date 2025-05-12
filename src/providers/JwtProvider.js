import JWT from 'jsonwebtoken'

/**
 * Function tạo mới một token - Cần 3 tham số đầu vào:
 * userInfo: Những thông tin muốn đính kèm vào token
 * secretSignature: Chữ ký bí mật để mã hóa token (còn gọi là privateKey)
 * tokenLife: Thời gian sống của token (thời gian hết hạn)
 */
const generateToken = async (userInfo, secretSignature, tokenLife) => {
  try {
    return JWT.sign(userInfo, secretSignature, {
      algorithm: 'HS256',
      expiresIn: tokenLife
    })
  } catch (error) { throw new Error(error) }
}

/**
 * Function kiểm tra một token có hợp lệ hay không
 * Hợp lệ ở đây tức là token được tạo ra có đúng với chữ ký bí mật secretSignature trong dự án hay không
 */
const verifyToken = async (token, secretSignature) => {
  try {
    return JWT.verify(token, secretSignature)
  } catch (error) { throw new Error(error) }
}

export const JwtProvider = {
  generateToken,
  verifyToken
}