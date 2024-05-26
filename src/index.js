require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActivityType,
  EmbedBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.username} is online - SHOOOOW MEEEEE!`);
  client.user.setActivity({
    name: "Gearing up for the 2024 NC Air Hockey State Tournament!",
    type: ActivityType.Custom,
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "populate-tables") {
    console.log("Populating tables...");
    const embed1thru5 = new EmbedBuilder()
      .setTitle(`TABLES 1-5 CURRENT MATCHES`)
      .setFields(
        { name: "Table 1", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 2", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 3", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 4", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 5", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true }
      );

    const embed6thru10 = new EmbedBuilder()
      .setTitle(`TABLES 6-10 CURRENT MATCHES`)
      .setFields(
        { name: "Table 6", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 7", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 8", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 9", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 10", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true }
      );

    const embed11thru15 = new EmbedBuilder()
      .setTitle(`TABLES 11-15 CURRENT MATCHES`)
      .setFields(
        { name: "Table 11", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 12", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 13", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 14", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true },
        { name: "Table 15", value: "[table type here]" },
        { name: "Player 1", value: "TBA", inline: true },
        { name: "VS", value: "---", inline: true },
        { name: "Player 2", value: "TBA", inline: true }
      );

    const response = await interaction.reply({
      embeds: [embed1thru5, embed6thru10, embed11thru15],
      fetchReply: true,
    });
    const msgId = response.id;

    console.log("Tables populated successfully!");
  }

  if (interaction.commandName === "edit-table-embed") {
    const table = interaction.options.get("table-number").value;
    let playerOne = interaction.options.get("player-one").value;
    let playerTwo = interaction.options.get("player-two").value;

    const isMention = (str) => /^<@!?(\d+)>$/.test(str);

    const getUserNameOrNickname = async (mention) => {
      const userId = mention.match(/^<@!?(\d+)>$/)[1];
      const member = await interaction.guild.members.fetch(userId);
      return member ? `<@${userId}>` : mention;
    };

    if (isMention(playerOne)) {
      playerOne = await getUserNameOrNickname(playerOne);
    }

    if (isMention(playerTwo)) {
      playerTwo = await getUserNameOrNickname(playerTwo);
    }

    const embedsChannelId = process.env.CURRENT_MATCHES_CHANNEL_ID;
    const embedsMessageId = process.env.CURRENT_MATCHES_EMBEDS_MESSAGE_ID;

    const embedsChannel =
      interaction.client.channels.cache.get(embedsChannelId);
    if (!embedsChannel) {
      return interaction.reply({
        content: "Channel not found.",
        ephemeral: true,
      });
    }

    const embedsMessage = await embedsChannel.messages.fetch(embedsMessageId);
    if (!embedsMessage) {
      return interaction.reply({
        content: "Message not found.",
        ephemeral: true,
      });
    }

    const embeds = embedsMessage.embeds.map((embed) =>
      EmbedBuilder.from(embed)
    );

    let embedIndex;
    let baseIndex;

    if (table <= 5) {
      embedIndex = 0;
      baseIndex = (table - 1) * 4;
    } else if (table <= 10) {
      embedIndex = 1;
      baseIndex = (table - 6) * 4;
    } else {
      embedIndex = 2;
      baseIndex = (table - 11) * 4;
    }

    embeds[embedIndex].data.fields[baseIndex + 1].value = playerOne; // Player One field
    embeds[embedIndex].data.fields[baseIndex + 3].value = playerTwo; // Player Two field

    await embedsMessage.edit({ embeds });

    const notificationsChannelId = process.env.UPDATE_NOTIFICATIONS_CHANNEL_ID;
    const notificationsChannel = interaction.client.channels.cache.get(
      notificationsChannelId
    );
    if (notificationsChannel) {
      await notificationsChannel.send(
        `Next up on Table ${table}: ${playerOne} versus ${playerTwo}!`
      );
    } else {
      console.error("Notification channel not found.");
    }

    await interaction.reply({
      content: `Table ${table} updated successfully!`,
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);
