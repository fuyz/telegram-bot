module.exports = (bot) => {

  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Here are the commands you can use:\n/start - Start the bot\n/help - Show help');
  });

  bot.onText(/\/photo/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, 'https://www.ruanyifeng.com/blogimg/asset/2017/bg2017052701.png');
  });

  // 发送位置
  bot.onText(/\/newlocation/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendLocation(chatId, 39.908692, 116.397477);
  });

  bot.onText(/\/poll/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPoll(chatId, 'Do you like JavaScript?', ['Yes', 'No']); // 发送投票
  });


  // bot.onText(/\/newtest/, (msg) => {
  //   bot.sendBasicGroupList(msg.chat.id);
  // }

  // 设置机器人命令列表
  bot.onText(/\/mycommand/, (msg) => {
    bot.setMyCommands([
      { command: '/start', description: '开始使用机器人' },
      { command: '/pay', description: '测试支付功能' },
      { command: '/help', description: '查看帮助信息' },
      { command: '/photo', description: '发送图片' },
      { command: '/newlocation', description: '显示一个地址' },
      { command: '/poll', description: '创建一个投票' },
      { command: '/mycommand', description: '设置机器人命令列表' }
    ], { language_code: 'zh' });
  });

  // bot.onText(/\/url/, (msg) => {
  //   const chatId = msg.chat.id;
  //   bot.sendMessage(chatId, 'Click the button below to visit Google:', opts);
  // });


}
