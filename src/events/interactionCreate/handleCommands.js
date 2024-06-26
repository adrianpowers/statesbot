const { devs, testServer, prodServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
    if (!commandObject) return;

    await commandObject.callback(client, interaction);
  } catch (err) {
    console.log(`There was an error running this command: ${err.message}`);
  }
}