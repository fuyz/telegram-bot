# telegram-bot 使用手册
telegram bot

---

### 通过点击此链接，跳转到您的机器人聊天，并发送：
- /start airplane
```js
  https://t.me/fuyz_bot?start=airplane
````

### 提示用户选择一个组以将bot添加进去，并发送：
- /start@your_bot spaceship
```js
 https://t.me/fuyz_bot?startgroup=spaceship
```

---

### 如何运行此项目

1. 克隆此仓库到本地：
  ```sh
  git clone https://github.com/yourusername/telegram-bot.git
  ```

2. 进入项目目录：
  ```sh
  cd telegram-bot
  ```

3. 安装依赖：
  ```sh
  npm install
  ```

4. 配置环境变量：
  在项目根目录下创建一个 `.env` 文件，并添加以下内容：
  ```env
  TELEGRAM_BOT_TOKEN=your_telegram_bot_token
  ```

5. 启动项目：
  ```sh
  npm start
  ```

### 项目结构

- `src/` - 源代码目录
- `test/` - 测试目录
- `README.md` - 项目说明文件

### 贡献

欢迎贡献！请 fork 此仓库并提交 pull request。

### 许可证

此项目使用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
