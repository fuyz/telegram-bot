
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


  // 设置机器人命令列表
  bot.onText(/\/setcommand/, (msg) => {
    const commands = commandsConfig.commands.map(cmd => ({ command: cmd.command.slice(1), description: cmd.description }));
    bot.setMyCommands(commandsConfig.commands, { language_code: 'zh' });
  });


}
