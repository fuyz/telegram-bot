const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/index.json');
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


// 处理用户消息
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   if (text !== '/start') {
//     bot.sendMessage(chatId, `haha, You said: ${text}`);
//   }
// });
