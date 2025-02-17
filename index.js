const TelegramBot = require('node-telegram-bot-api');

// 替换为你的 API Token
const token = 'YOUR_API_TOKEN';

// 创建机器人实例
const bot = new TelegramBot(token, { polling: true });

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am your Telegram bot.');
});

// 处理用户消息
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text !== '/start') {
    bot.sendMessage(chatId, `You said: ${text}`);
  }
});