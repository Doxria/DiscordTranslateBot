const { Client, GatewayIntentBits, ApplicationCommandType, Events, MessageFlags } = require('discord.js');
const Database = require('better-sqlite3');
const translate = require('@iamtraction/google-translate');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const db = new Database('translations.sqlite');
db.prepare(`CREATE TABLE IF NOT EXISTS translations (messageId TEXT, language TEXT, translatedText TEXT)`).run();

client.once(Events.ClientReady, async () => {
	try {
		for (const [guildId, guild] of client.guilds.cache) {
			await guild.commands.create({ name: 'Translate', type: ApplicationCommandType.Message });
		}
		console.log('All downloads are complete. You can test the right-click menu on Discord.');
	} catch (error) {
		console.error('Error loading command:', error);
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isMessageContextMenuCommand() || interaction.commandName !== 'Translate') return;
	await interaction.deferReply({ flags: MessageFlags.Ephemeral });
	const targetMessageId = interaction.targetId;
	const targetMessage = interaction.targetMessage;
	const userLang = interaction.locale.split('-')[0];
	if (!targetMessage.content) {
		return interaction.editReply({ content: 'There is no text to translate in this message.' });
	}

	try {
		const stmt = db.prepare('SELECT translatedText FROM translations WHERE messageId = ? AND language = ?');
		const cachedTranslation = stmt.get(targetMessageId, userLang);
		if (cachedTranslation) {
			return interaction.editReply({ content: `**Translation (${interaction.locale}):**\n${cachedTranslation.translatedText}` });
		}
		const result = await translate(targetMessage.content, { to: userLang });
		db.prepare('INSERT INTO translations (messageId, language, translatedText) VALUES (?, ?, ?)').run(targetMessageId, userLang, result.text);
		await interaction.editReply({ content: `**Translation (${interaction.locale}):**\n${result.text}` });
	} catch (error) {
		console.error('Translation Error:', error);
		await interaction.editReply({ content: 'An error occurred while translating the message.' });
	}
});

client.on(Events.MessageDelete, async message => {
	const info = db.prepare('DELETE FROM translations WHERE messageId = ?').run(message.id);
	if (info.changes > 0) { console.log(`${message.id} The translation data for the message with ID has been deleted.`); }
});

client.login('TOKEN_HERE');
