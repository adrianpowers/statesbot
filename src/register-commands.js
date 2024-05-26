require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "table",
    description:
      "Updates a table message with the players who are currently playing on it",
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
  },
  {
    name: "populate-tables",
    description:
      "Populates the #current-matches channel with embeds, each updated with /edit-table-embed.",
  },
  {
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
      }
    ]
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.PROD_GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Slash commands registered successfully!");
  } catch (err) {
    console.error(err);
  }
})();
