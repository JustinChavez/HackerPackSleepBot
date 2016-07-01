if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();



var team = new Array();

    //Add team members here
    team["U0ZERN2NN"] = 0;
    team["U11C4JN14"] = 0;

var teamInfo = new Array();
    teamInfo["U0ZERN2NN"] = "Justin Chavez, 585-880-0339";
    teamInfo["U11C4JN14"] = "Jonathan Chavez, 123-456-7891";

//wakeup starts the initial practice in making sure that people are awake
controller.hears(['wakeup'], 'direct_message,direct_mention,mention', function(bot, message) {


    for (key in team)
    {
        bot.startPrivateConversation({ user: key},function(err,dm) 
        {
            dm.say('There is just news. There is no good or bad.')
            dm.say('Are you awake my friend? Please say yes');
                

        });
    }

});


controller.hears(['yes'], 'direct_message', function(bot, message) {

    team[message.user] = 1;
    bot.reply(message, "The universe has brought us the dragon warrior!");

});

controller.hears(['reset'], 'direct_message', function(bot, message) {

    team[message.user] = 0;
    bot.reply(message, "reset worked");


});

//getup will notify others to wakeup the people who are not awake
controller.hears(['getup'], 'direct_message,direct_mention,mention', function(bot, message) {

    var peopleToWake = "";
    for (key in team)
    {
        if (team[key] == 0)
        {
            peopleToWake = peopleToWake + teamInfo[key] + "\n";
        }
    }

            bot.say(
                {
                    text: 'These young warriors need extra help waking up:',
                    channel: 'C0ZEF3BHT'
                }
            );
            bot.say(
                {
                    text: peopleToWake,
                    channel: 'C0ZEF3BHT'
                }

            );

});


function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}