const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "populate-tables",
  description:
    "Populates the #current-matches channel with embeds, each updated with /edit-table-embed.",
  deleted: false,
  callback: async (client, interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "populate-tables") {
      console.log("Populating tables...");
      const embed1thru4 = new EmbedBuilder()
        .setTitle(`TABLES 1-4 CURRENT MATCHES`)
        .setFields(
          { name: "Table 1", value: "Paul's Pro Style" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 2", value: "Steve's Photon" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 3", value: "Dean's Pro Style" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 4", value: "Sarah's Pro Style" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true }
        );

      const embed5thru8 = new EmbedBuilder()
        .setTitle(`TABLES 5-8 CURRENT MATCHES`)
        .setFields(
          { name: "Table 5", value: "Seth's Pro Style" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 6", value: "Dain's Pro Style" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 7", value: "Steve's Pro Style" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 8", value: "Steve's Purple Top" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true }
        );

      const embed9thru12 = new EmbedBuilder()
        .setTitle(`TABLES 9-12 CURRENT MATCHES`)
        .setFields(
          { name: "Table 9", value: "Steve's Light Purple Top" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 10", value: "Sarah's Hot Flash" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 11", value: "Sarah's Hot Flash" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true },
          { name: "Table 12", value: "Rif's Blue Top" },
          { name: "Player 1", value: "TBA", inline: true },
          { name: "VS", value: "---", inline: true },
          { name: "Player 2", value: "TBA", inline: true }
        );

      const response = await interaction.reply({
        embeds: [embed1thru4, embed5thru8, embed9thru12],
        fetchReply: true,
      });
      const msgId = response.id;

      console.log("Tables populated successfully!");
    }
  },
};
