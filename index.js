const { text } = require('express');
const TelegramBot = require('node-telegram-bot-api');

// 替换为你的 API Token
const token = '7694921790:AAH2JwwCCO1zxv4Oek4qhyp0ajDLGEilDgk';

// 创建机器人实例
const bot = new TelegramBot(token, { polling: true });

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
  console.log('msg:', msg);
  const chatId = msg.chat.id;
  const first_name = msg.from.first_name;
  const opts = {
    parse_mode: 'HTML', // 解析模式
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '分享给好友',
            switch_inline_query: '这个机器人很好用'
          }, 
          // {
          //   text: '分享给好友',
          //   switch_inline_query_current_chat: '这个机器人很好用'
          // },          
          {
            text: '添加到群组',
            switch_inline_query_chosen_chat:{query: '', chat_id: chatId, allow_group_chats: true}
          },
          // {
          //   text: '添加到频道',
          //   switch_inline_query_chosen_chat:{ chat_id: chatId, allow_channel_chats: true}
          // },
          // {
          //   text: '打开谷歌',
          //   url: 'https://www.google.com'
          // },
          // {
          //   text: '转发到谷歌',
          //   login_url: {
          //     url: 'https://t.me/fuyz_bot?start=123456',
          //     forward_text: '转发到谷歌',
          //     bot_username: 'fuBot'
          //   }
          // }
        ]
      ],
        keyboard:  [
          [
            {
              text: '分享我的联系方式',
              request_contact: true // 请求联系方式
            },
            {
              text: '分享我的位置',
              request_location: true // 请求位置
            },
            // {
            //   text: '分享名片',
            //   request_user: {
            //     request_id: 123456789,
            //     user_is_bot: false,
            //     request_photo: true,
            //     request_name: true,                
            //   }
            // }
          ]
        ],
        input_field_placeholder: '欢迎使用 fuBot 机器人！', // 输入框提示
        resize_keyboard: true, // 是否自适应大小
        one_time_keyboard: false, // 是否一次性显示
        is_persistent: false, // 是否固定显示
        selective: true, // 是否选择性显示
        force_reply: true, // 是否强制回复
    }
  };
  bot.sendMessage(chatId, `
    <blockquote expandable>${first_name}：${msg.text}</blockquote>  
    <b>您好，欢迎使用 fuBot 机器人！</b> 
    fuBot 兼具:
        扎实可靠的<b>群组管理功能</b>；
        温暖搞笑的<b>互动娱乐功能</b>；
        <b>高效安全、保障隐私</b>；
    是您管理群组和频道的好帮手。    
    欢迎在您的群组和频道免费使用 fuBot。
    <tg-spoiler>现在时间：${new Date().toLocaleString()}</tg-spoiler>
    `, opts);
});

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
    { command: '/help', description: '查看帮助信息' },
    { command: '/photo', description: '发送图片' },
    { command: '/newlocation', description: '显示一个地址' },
    { command: '/poll', description: '创建一个投票' },
    { command: '/mycommand', description: '设置机器人命令列表' }
  ],{ language_code: 'zh' });
});

// bot.onText(/\/url/, (msg) => {
//   const chatId = msg.chat.id;
  
//   bot.sendMessage(chatId, 'Click the button below to visit Google:', opts);
// });



// 处理用户消息
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   if (text !== '/start') {
//     bot.sendMessage(chatId, `haha, You said: ${text}`);
//   }
// });