const admin = require('../../config/admin.json');

module.exports = (bot) => {
  const commands = [
    { command: '/start', description: '开始使用机器人' },
    { command: '/pay', description: '测试支付功能' },
    { command: '/help', description: '查看帮助信息' },
    { command: '/photo', description: '发送图片' },
    { command: '/newlocation', description: '显示一个地址' },
    { command: '/poll', description: '创建一个投票' },
    { command: '/sendNew', description: '发送一条置顶消息' },
    { command: '/mycommand', description: '设置机器人命令列表' }
  ];

  // 消息处理
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg)
    // 无效指令自动回复
    const validCommands = commands.map(cmd => cmd.command);
    // Check if the message is a command and if it's not in the valid commands list
    if (text && text.startsWith('/') && !validCommands.some(cmd => text.startsWith(cmd))) {
      bot.sendMessage(chatId, '对不起，我不理解该命令。输入 /help 查看可用命令列表。');
    }

    // console.log(msg)
    // 检查是否为管理员消息
    if (msg.from.is_bot || msg.from.id === admin.fyz.id) {
      try {
        await bot.pinChatMessage(chatId, messageId);
        bot.sendMessage(chatId, 'Message pinned automatically.');
      } catch (error) {
        console.error('Failed to pin message:', error);
      }
    }

  });

  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    let helpMessage = '可用命令列表:\n';
    commands.forEach(cmd => {
      helpMessage += `${cmd.command} - ${cmd.description}\n`;
    });

    bot.sendMessage(chatId, helpMessage);
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
    bot.setMyCommands(commands, { language_code: 'zh' });
  });

  // bot.onText(/\/url/, (msg) => {
  //   const chatId = msg.chat.id;
  //   bot.sendMessage(chatId, 'Click the button below to visit Google:', opts);
  // });


}
