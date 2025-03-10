const chalk = require('chalk');
const admin = require('@/config/admin.json');

module.exports = (bot) => {
  // 用于存储置顶消息 ID 的数组
  let pinnedMessageIds = [];

  // 自动置顶一条消息
  bot.onText(/\/announce/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      // 检查是否为管理员消息
      if (msg.from.is_bot || msg.from.id == admin.fyz.id) {
        // 发送消息
        const message = await bot.sendMessage(chatId, '这是一条重要通知!');
        const messageId = message.message_id;

        // 置顶消息
        await bot.pinChatMessage(chatId, messageId);
        console.log(chalk.green('消息置顶成功！'));
      }
    } catch (error) {
      console.error(chalk.red('Failed to pin message:', error));
      bot.sendMessage(chatId, '消息置顶失败。请检查聊天权限！');
    }
  })

  // 手动置顶一条消息: /pin 56
  bot.onText(/\/pin (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const messageId = parseInt(match[1]); // 获取消息 ID
    console.log('chatId:', chatId, 'messageId:', messageId)
    try {
      // 检查是否为管理员消息
      if (msg.from.is_bot || msg.from.id == admin.fyz.id) {
        await bot.pinChatMessage(chatId, messageId);
        bot.sendMessage(chatId, '消息置顶成功！');
      }
    } catch (error) {
      bot.sendMessage(chatId, '消息置顶失败。请检查messageId是否正确！');
      console.error('Failed to pin message:');
    }
  });


  // 监听置顶消息事件
  bot.on('pinned_message', async (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.pinned_message.message_id;
    // 将置顶消息 ID 添加到数组中
    pinnedMessageIds.push(messageId);
    console.log(pinnedMessageIds)
    try {
      // 删除置顶消息
      if (pinnedMessageIds.length <= 1) return
      await bot.deleteMessage(chatId, pinnedMessageIds[0]);
      console.log(chalk.green('删除置顶消息成功'));
    } catch (error) {
      console.log(chalk.red('删除置顶消息失败'));
    }
  });
}
