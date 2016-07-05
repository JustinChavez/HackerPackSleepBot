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
    //Justin
    team["U0ZERN2NN"] = 0;

    //Jonathan
    team["U11C4JN14"] = 0;

    //Linhchi
    team["U0ZEFK971"] = 0;

    //Amy
    team["U1C1LUVU7"] = 0;

    //Jaime
    team["U1ASDT37U"] = 0;

    //Lois
    team["U1BP6ERCG"] = 0;

    //Angelina
    team["U19MA1DGB"] = 0;

    //Loryn
    //team["U1LP1SHEJ"] = 0;

var teamInfo = new Array();

    teamInfo["U0ZERN2NN"] = "Justin Chavez, 585-880-0339 room: homeless";
    teamInfo["U11C4JN14"] = "Jonathan Chavez, 123-456-7891 room: 306";
    teamInfo["U0ZEFK971"] = "Linhchi Nguyen 301-281-1705 room: 400S";
    teamInfo["U1C1LUVU7"] = "Amy Tong phone unknown room: somewhere in the depths of Bloomberg";
    teamInfo["U1ASDT37U"] = "Jaime Orellana 240-492-9431 room: 405";
    teamInfo["U1BP6ERCG"] = "Lois Dzebissov phone unknown room: across from angelina's";
    teamInfo["U19MA1DGB"] = "Angelina Bingei 301-646-6647 room: to the left of room 400S";
    //teamInfo["U1LP1SHEJ"] = "Loryn Chen 240-994-8163 room: 305";

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