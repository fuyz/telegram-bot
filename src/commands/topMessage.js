module.exports = (bot) => {

  // 假设你已经发送了一条消息，并获取了消息 ID
  // let chatId = ''; // 替换为聊天 ID
  // let messageId = ''; // 替换为消息 ID

  // 置顶消息
  // if (!chatId || !messageId) {
  //   console.error('Please provide chatId and messageId');
  //   return;
  // }
  // bot.pinChatMessage(chatId, messageId)
  //   .then(() => {
  //     console.log('Message pinned successfully');
  //   })
  //   .catch((error) => {
  //     console.error('Failed to pin message:');
  //   });

  // 自动置顶一条消息
  bot.onText(/\/announce/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      // 发送消息
      const message = await bot.sendMessage(chatId, '这是一条重要通知!');
      const messageId = message.message_id;

      // 置顶消息
      await bot.pinChatMessage(chatId, messageId);
      console.log('消息置顶成功！');
    } catch (error) {
      console.error('Failed to pin message:');
      bot.sendMessage(chatId, '消息置顶失败。请检查聊天权限！');
    }
  })

  // 监听 /pin 56命令
  bot.onText(/\/pin (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = parseInt(match[1]); // 获取消息 ID
    console.log('chatId:', chatId, 'messageId:', messageId)
    try {
      await bot.pinChatMessage(chatId, messageId);
      bot.sendMessage(chatId, '消息置顶成功！');
    } catch (error) {
      bot.sendMessage(chatId, '消息置顶失败。请检查messageId是否正确！');
      console.error('Failed to pin message:');
    }
  });
}
