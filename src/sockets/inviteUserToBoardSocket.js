/**
 * Updated by Pham Van Duc on April 23, 2025
 * Facebook: https://www.facebook.com/vanduc.hhbg.03
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// Param socket sẽ được lấy từ thư viện socket.io
export const inviteUserToBoardSocket = (socket) => {
  // Lắng nghe sự kiện mà client emit lên có tên là: FE_USER_INVITED_TO_BOARD
  socket.on('FE_USER_INVITED_TO_BOARD', (invitation) => {
    // Cách làm nhanh và đơn giản nhất: Emit ngược lại một sự kiện về cho mọi client khác (ngoại trừ chính cái thằng gửi request lên), rồi để phía client check
    socket.broadcast.emit('BE_USER_INVITED_TO_BOARD', invitation)
  })
}
