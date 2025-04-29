/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// Những domain được phép truy cập vào API
export const WHITELIST_DOMAINS = [
  'https://trello-web-seven-zeta.vercel.app/'
  // 'http://localhost:5173'
  // Không cần localhost nữa vì ở file config/cors đã luôn luôn cho phép môi trường dev
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}