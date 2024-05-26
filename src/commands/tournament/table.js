const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
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
  deleted: true,
}