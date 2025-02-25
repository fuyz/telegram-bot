
const commandsConfig = require('@/config/commands.json');

module.exports = (bot) => {

  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    let helpMessage = '可用命令列表:\n';
    commandsConfig.commands.forEach(cmd => {
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
