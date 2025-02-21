module.exports = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const first_name = msg.from.first_name;
    const opts = {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '分享给好友', switch_inline_query: '这个机器人很好用' },
            { text: '添加到群组', switch_inline_query_chosen_chat: { query: '', chat_id: chatId, allow_group_chats: true } },
          ]
        ],
        // keyboard: [
        //   [
        //     { text: '分享我的联系方式', request_contact: true },
        //     { text: '分享我的位置', request_location: true }
        //   ]
        // ],
        input_field_placeholder: '欢迎使用 fuBot 机器人！',
        resize_keyboard: true,
        one_time_keyboard: false,
        is_persistent: false,
        selective: true,
        force_reply: true,
      }
    };
    bot.sendMessage(chatId, `
      <blockquote expandable>${first_name}：${msg.text}</blockquote>
      <b>您好，欢迎使用 fuBot 机器人！</b>
      fuBot 兼具:
          扎实可靠的<b>群组管理功能</b>；
          温暖搞笑的<b>互动娱乐功能</b>；
          <b>高效安全、保障隐私</b>；
      是您管理群组和频道的好帮手。
      欢迎在您的群组和频道免费使用 fuBot。
      <tg-spoiler>现在时间：${new Date().toLocaleString()}</tg-spoiler>
    `, opts);
  });
};
