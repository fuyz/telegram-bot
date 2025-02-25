require('module-alias/register');
const chalk = require('chalk');
const TelegramBot = require('node-telegram-bot-api');
const config = require('@/config/index.json');
const commandsConfig = require('@/config/commands.json');
// 替换为你的 API Token
const token = config.token || '7694921790:AAH2JwwCCO1zxv4Oek4qhyp0ajDLGEilDgk';

// 创建机器人实例
const bot = new TelegramBot(token, {
  polling: true,
  // environment: 'test' // 设置为测试环境
});
// 处理命令
require('./commands/start')(bot);
require('./commands/others')(bot);
// 处理支付
require('./payment.js')(bot);
// 消息置顶
require('./commands/topMessage.js')(bot);
// 群组管理
require('./commands/manageGroup.js')(bot);
// 操作面板
require('./commands/operationPanel.js')(bot);


// 消息处理
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.group(chalk.blue('接收消息分组：'));
  // console.log(chalk.blue('Hello world!'));
  // console.log(chalk.red('This is an error message.'));
  // console.log(chalk.green('Success!'));
  if (msg.from.is_bot) {
    console.log(msg)
    console.log(chalk.blue('Bot message：' + msg.reply_to_message.text));
  } else {
    console.log(msg);
  }
  console.groupEnd();
  // 无效指令自动回复
  const validCommands = commandsConfig.commands.map(cmd => cmd.command);
  // Check if the message is a command and if it's not in the valid commands list
  if (text && text.startsWith('/') && !validCommands.some(cmd => text.startsWith(cmd))) {
    bot.sendMessage(chatId, '对不起，我不理解该命令。输入 /help 查看可用命令列表。');
  }

});
