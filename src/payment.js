const config = require('@/config/index.json');

module.exports = function payment (bot) {
  // 替换为你的支付提供商 Token（如 Stripe）
  const PAYMENT_PROVIDER_TOKEN = config.test_private_token

  // 发送支付发票
  bot.onText(/\/pay/, async (msg) => {
    const chatId = msg.chat.id;
    const invoice = {
      title: 'Test Payment',
      description: 'This is a test payment',
      payload: 'test-payment',
      provider_token: '',  // 对于 Telegram Stars，provider_token 应该为空
      start_parameter: 'test',
      currency: 'XTR',  // 使用 Telegram Stars 的货币代码: XTR
      prices: [
        { label: 'Test Product', amount: 100 } // 金额单位为最小货币单位（如美元的分）
      ]
    };

    try {
      await bot.sendInvoice(chatId,
        invoice.title, invoice.description, invoice.payload,
        invoice.provider_token, invoice.currency, invoice.prices);
      console.log('Invoice sent successfully');
    } catch (error) {
      console.error('Failed to send invoice:');
    }
  });

  // 发送付费媒体内容
  bot.onText(/\/buy_media/, async (msg) => {
    const chatId = msg.chat.id;

    // 发送支付发票
    const invoice = {
      title: '优质媒体内容',
      description: '访问独家照片和视频',
      payload: 'premium_media',
      provider_token: '',
      currency: 'XTR', // 使用 Telegram Stars 的货币代码
      prices: [
        { label: 'Premium Access', amount: 1000 } // 金额单位为最小货币单位
      ]
    };

    try {
      await bot.sendInvoice(chatId,
        invoice.title, invoice.description, invoice.payload,
        invoice.provider_token, 'test', invoice.currency, invoice.prices);
      console.log('Invoice sent successfully');
    } catch (error) {
      console.error('Failed to send invoice:', error);
    }
  });


  // 处理支付前查询
  bot.on('pre_checkout_query', async (query) => {
    const queryId = query.id;
    try {
      await bot.answerPreCheckoutQuery(queryId, true);
      console.log('Pre-checkout query approved');
    } catch (error) {
      console.error('Failed to approve pre-checkout query:', error);
    }
  });

  // 处理支付成功
  bot.on('message', async (msg) => {
    if (msg.successful_payment) {
      const chatId = msg.chat.id;
      try {
        await bot.sendMessage(chatId, 'Payment successful! Thank you for your purchase.');
        console.log('Payment successful:', msg.successful_payment);
      } catch (error) {
        console.error('Failed to send payment success message:', error);
      }
    }
  });
}
