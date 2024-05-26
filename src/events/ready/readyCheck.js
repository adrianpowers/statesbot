const { ActivityType } = require("discord.js");
 
module.exports = (client) => {
  console.log(`${client.user.username} is online - SHOOOOW MEEEEE!`);
  client.user.setActivity({
    name: "Gearing up for the 2024 NC Air Hockey State Tournament!",
    type: ActivityType.Custom,
  });
}