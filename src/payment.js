const config = require('../config/index.json');

module.exports = function payment (bot) {
  // 替换为你的支付提供商 Token（如 Stripe）
  const PAYMENT_PROVIDER_TOKEN = 'YOUR_PAYMENT_PROVIDER_TOKEN';

  // 发送支付发票
  bot.onText(/\/pay/, async (msg) => {
    const chatId = msg.chat.id;
    const invoice = {
      title: 'Test Payment',
      description: 'This is a test payment',
      payload: 'test-payment',
      provider_token: PAYMENT_PROVIDER_TOKEN,
      start_parameter: 'test',
      currency: 'USD',
      prices: [
        { label: 'Test Product', amount: 1000 } // 金额单位为最小货币单位（如美元的分）
      ]
    };

    try {
      await bot.sendInvoice(chatId, invoice.title, invoice.description, invoice.payload, invoice.provider_token, invoice.start_parameter, invoice.currency, invoice.prices);
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
