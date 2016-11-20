# Master Oogway Slack Wakeup Bot

Based on the hit movie Kung Fu Panda

This bot is able to contact the members of your slack team at a designated time to ask if they are awake. If the members do not respond with the specific command to Master Oogway, then at a designated later time Master Oogway will publish their information so the other team members may wake up the sleeping members.



## Installation

Follow the guide from Botkit for Installation: https://github.com/howdyai/botkit#install-botkit-from-npm-or-github

## Getting Started

To learn how to integrate the a Slack bot follow the Getting Started Guide from Botkit: https://github.com/howdyai/botkit/blob/master/readme-slack.md#getting-started

### Adding teammates

Most of the information needs to be provided within the file oogwaybot.js. Withing the Array team, you need to include the information of each team member that will be contacted by Master Oogway. You will need the id of each user and you can easily find them using this API tester: https://api.slack.com/methods/users.list/test

The 0 integer assigned to each element of the array is used in boolean logic later on to see remember who is awake. 

Within the teamInfo Array you must list out each member of the team again. This time the string that is assigned to each element of the array is the information about the member that will be published if they overslept. Useful information to put their would be their phone numbers and sleeping location. 

Within ''' controller.hears(['getup'], ... ''' You need to include the channel id for where the notification to wakeup the other teammates should be published. It should be public channel and you will need the id to replace <channelID>. You can use the following api to list the channel ID's: https://api.slack.com/methods/channels.list/test. It is advised to use the general channel. 

bot built using botkit from: https://github.com/howdyai/botkit

## Operation

### wakeup

Once the bot is up and running and is programmed with the neccesary information, we can then proceed with the message automation.

Master Oogway will message everybody listed in the team when the command 'wakeup' is sent to him via direct message. 

The message Master Oogway will request each member to say yes to him. Upon hearing the message yes, Master Oogway will make the member awake through the array team. 

### getup

After hearing wakeup, Master Oogway will await the command 'getup'. Once Master Oogway hears getup, he will immediately list who has not responded yes to the desginated channel. 

### reset

When Master Oogway hears reset, the array marking members that have responded (team) will be reset making it so that no members are marked that they have responded. 


## Tips

The slackbot can be automated to send messages to Master Oogway like wakeup and getup so the user will not manually have to.

use 
```
/remind <user> <message> in/at <time length/specific time>
```

And replace <message> with wakeup or getup. This way you can set recurring reminders.




 