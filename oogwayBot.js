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
    team["U0ZERN2NN"] = 1;

//wakeup starts the initial practice in making sure that people are awake
controller.hears(['wakeup'], 'direct_message,direct_mention,mention', function(bot, message) {


    for (key in team)
    {
        bot.startPrivateConversation({ user: key},function(err,dm) 
        {
    
            dm.say('Are you awake? Please reply yes');
                

        });
    }

});


controller.hears(['yes'], 'direct_message', function(bot, message) {

    team[message.user] = 1;
    bot.reply(message, "yes worked");

});

controller.hears(['reset'], 'direct_message', function(bot, message) {

    team[message.user] = 0;
    bot.reply(message, "reset worked");


});

//getup will notify others to wakeup the people who are not awake
controller.hears(['getup'], 'direct_message,direct_mention,mention', function(bot, message) {


    for (key in team)
    {
        if (team[key] == 0)
        {
            bot.startPrivateConversation({ user: key},function(err,dm) 
            {
                dm.say('Are you awake? Please reply yes');
            });
        }
    }

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