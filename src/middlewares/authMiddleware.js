import { StatusCodes } from 'http-status-codes'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'

// Middleware này sẽ đảm nhiệm việc quan trọng: Xác thực cái JWT accessToken nhận được từ phía FE có hợp lệ hay không?
const isAuthorized = async (req, res, next) => {
  // Lấy accessToken từ cookie nằm trong request cookie phía client - withCredentials trong file authorizedAxios
  const clientAccessToken = req.cookies?.accessToken

  // Nếu client accessToken không tồn tại thì trả về lỗi
  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (token not found)'))
    return
  }

  try {
    // B1: Thực hiện giải mã token xem có hợp lệ hay không?
    const accessTokenDecoded = await JwtProvider.verifyToken(
      clientAccessToken,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    )
    // console.log('accessTokenDecoded: ', accessTokenDecoded)

    // B2: Nếu token hợp lệ, thì lưu thông tin giải mã được vào req.jwtDecoded, để xử dụng cho các tầng xử lý phía sau
    req.jwtDecoded = accessTokenDecoded

    // B3: Cho phép request đi tiếp
    next()
  } catch (error) {
    // console.log('error authMiddleware: ', error)
    // Nếu accessToken bị hết hạn => cần trả về lỗi GONE - 410 cho phía FE biết để gọi api refreshToken
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Neet to refresh token!'))
      return
    }

    // Nếu accessToken không hợp lệ (bất kể lỗi gì nhưng k phải hết hạn) => trả về lỗi 401 cho phía FE gọi api sign_out luôn
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized!'))
  }
}

export const authMiddleware = {
  isAuthorized
}