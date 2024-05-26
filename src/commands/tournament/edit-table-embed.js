const {
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "edit-table-embed",
  description: "Edits the given table embed with the current players.",
  options: [
    {
      name: "table-number",
      description: "Which table is being updated?",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "player-one",
      description: "First player in the set",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "player-two",
      description: "Second player in the set",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  deleted: false,
  callback: async (client, interaction) => {
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

      const notificationsChannelId =
        process.env.UPDATE_NOTIFICATIONS_CHANNEL_ID;
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
  },
};
