require('module-alias/register');
const TelegramBot = require('node-telegram-bot-api');
const config = require('@/config/index.json');
const admin = require('@/config/admin.json');
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


// 处理用户消息

// 消息处理
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(msg)
  // 无效指令自动回复
  const validCommands = commandsConfig.commands.map(cmd => cmd.command);
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
