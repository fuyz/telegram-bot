const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // 默认端口为 3000

// 首页路由
app.get('/', (req, res) => {
  res.send('Hello, 欢迎来到黑桃♠!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});