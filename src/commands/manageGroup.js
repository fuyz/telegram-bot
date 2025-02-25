module.exports = (bot) => {

  // 示例：处理群组成员加入事件
  bot.on('new_chat_members', (msg) => {
    const chatId = msg.chat.id;
    const newMember = msg.new_chat_members[0].first_name;

    // 欢迎新成员
    bot.sendMessage(chatId, `欢迎, ${newMember}加入群聊！`);
  });

  // 示例：处理群组成员离开事件
  bot.on('left_chat_member', (msg) => {
    const chatId = msg.chat.id;
    const leftMember = msg.left_chat_member.first_name;

    // 通知成员离开
    bot.sendMessage(chatId, `${leftMember} 退出了群聊.`);
  });

}
