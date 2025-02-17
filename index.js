const TelegramBot = require('node-telegram-bot-api');

// 替换为你的 API Token
const token = '7694921790:AAH2JwwCCO1zxv4Oek4qhyp0ajDLGEilDgk';

// 创建机器人实例
const bot = new TelegramBot(token, { polling: true });

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am your Telegram bot. sir');
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Here are the commands you can use:\n/start - Start the bot\n/help - Show help');
});

bot.onText(/\/photo/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendPhoto(chatId, 'https://www.ruanyifeng.com/blogimg/asset/2017/bg2017052701.png');
});

// 处理用户消息
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text !== '/start') {
    bot.sendMessage(chatId, `haha, You said: ${text}`);
  }
});