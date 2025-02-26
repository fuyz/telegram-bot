module.exports = (bot) => {


  // 操作面板的内联键盘
  const adminPanel = {
    inline_keyboard: [
      [
        { text: '禁言', callback_data: 'ban' },
        { text: '踢出群聊', callback_data: 'kick' }
      ],
      [
        { text: 'Send Announcement', callback_data: 'announce' }
      ]
    ]
  };

  // 发送操作面板
  bot.onText(/\/admin/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Admin Panel', { reply_markup: adminPanel });
  });

  // 处理按钮点击
  bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const action = query.data;

    try {
      switch (action) {
        case 'ban':
          // 示例：禁言用户
          await bot.restrictChatMember(chatId, query.from.id, { can_send_messages: false });
          bot.sendMessage(chatId, `@${query.from.username} has been banned.`);
          break;
        case 'kick':
          // 示例：踢出用户
          await bot.kickChatMember(chatId, query.from.id);
          bot.sendMessage(chatId, `@${query.from.username} has been kicked.`);
          break;
        case 'announce':
          // 示例：发送公告
          bot.sendMessage(chatId, '这是管理员的公告');
          break;
        default:
          bot.sendMessage(chatId, 'Unknown action.');
      }
    } catch (error) {
      console.error('处理管理操作时出错:', error);
      bot.sendMessage(chatId, '执行操作时出现错误。');
    }

    // 编辑消息以移除按钮
    await bot.editMessageReplyMarkup({}, { chat_id: chatId, message_id: messageId });
  });

}
