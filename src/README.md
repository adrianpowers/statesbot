# Statesbot
## A Discord.js bot for managing the 2024 NC Air Hockey State Tournament. 

### _Commands:_

#### **/edit-table-embed**

##### *VARIABLES:*
**Table Number (integer/number):** the table number that you're updating, 1-15

**Player One** and **Player Two (strings):** the two players - you can mention the player if they're in the server, and if they're not, you can just put their name. 

> **Note here that if you want to mention a player, you have to put a @ before the name, as it won't automatically search unless you do that.**

##### *EFFECTS:*
Running this command will:
- update the embed for that table within the #current-matches channel to show the current players
- send a notification message to #updates-notifications that will mention the players (if they're in the server) to let them know their game is up; otherwise, it just says the players' names.
- if that player IS in the server, and if they have a server nickname set, it'll say that in the embed and the message. Otherwise, it'll use their global name. And if they're not in the server, it'll just show whatever string you entered into the variable box.

> **You should probably stick to running this command in the #current-matches channel, but it will work anywhere.**
