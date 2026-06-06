# 🌍 Discord Message Translator Bot

This project is a modern and lightweight Discord bot built with Discord.js v14 that allows users to translate messages in Discord chats into their own interface language. To avoid cluttering the chat, it utilizes the **Message Context Menu** and **Ephemeral** (hidden) message structures.

## ✨ Features

* **🌐 Automatic Language Detection:** The bot automatically detects the user's Discord interface language (`interaction.locale`) when a translation is requested and translates the message into that language.
* **🖱️ Right-Click Menu (Context Menu):** No need to type any commands or click buttons. Simply right-click on a message, select "Apps -> Translate", and translate instantly.
* **👻 Clutter-Free Responses:** The translated texts are only visible to the user who requested them (Ephemeral), keeping the channel neat and tidy.
* **⚡ SQLite Caching:** If a previously translated message is requested in the same language again, no request is sent to the Google Translate API; it is instantly fetched from the local `better-sqlite3` database.
* **🧹 Automatic Data Cleanup:** When the original message is deleted, all corresponding translation records in the database are also automatically removed.

## 🛠️ Technologies Used

* [Discord.js v14](https://discord.js.org/) - For Discord API interactions.
* [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3) - For fast and synchronous database operations.
* [@iamtraction/google-translate](https://www.npmjs.com/package/@iamtraction/google-translate) - For the translation infrastructure.

## 🚀 Installation

Follow these steps to run the project on your own computer or server:

**1. Clone the Repository:**
```bash
git clone https://github.com/doxria/DiscordTranslateBot.git
cd DiscordTranslateBot
```

**2. Install Dependencies:**
```bash
npm install discord.js better-sqlite3 @iamtraction/google-translate
```

**3. Configure Your Token:**
Open the `main.js` file, scroll to the bottom, and paste your Discord Bot Token where it says `TOKEN_HERE`.

**4. Start the Bot:**
```bash
node .
```

## 📖 How to Use

1. Once the bot joins your server and is online, right-click (or long-press on mobile) on any message you want to translate.
2. Navigate to the **Apps** option in the context menu.
3. Click on the **Translate** button.
4. The translated result will appear instantly as a private (ephemeral) message just for you.

## 📝 Notes

* Make sure to enable the **Message Content Intent** in the Discord Developer Portal so the bot can read and translate message contents.
* Commands are automatically registered to the servers (Guild Commands) the bot is in upon startup. This ensures they are updated instantly and ready to use.
