var app;
var users = [];
var telegram;

var init = (telegraf, usersFromFile, telegramBot) => {
    app = telegraf;
    users = usersFromFile;
    telegram = telegramBot;
}

var registerCommandHandlers = () => {
    app.command('start', (ctx) => {
        console.log('start', ctx.from.first_name);
        ctx.reply('Welcome!');
    });

    app.command('help', (ctx) => {
        console.log('help', ctx.from.first_name);
        ctx.reply(`dota - to start notify group members for starting game`);
        ctx.reply(`last - to show last matches from dotabuff.com`);
        ctx.reply(`twitch - to show live dota 2`);
    });

    app.command('last', (ctx) => {
        console.log('last', ctx.from.first_name);
        var user = users.find(u => u.user.id === ctx.from.id);
        if (user) {
            ctx.reply(user.URL);
        }
    });

    app.command('twitch', (ctx) => {
        console.log('twitch', ctx.from.first_name);
        ctx.reply(`https://www.twitch.tv/directory/game/Dota%202/ru`);
    });

    app.command('dota', (ctx) => {
        users.forEach(function (item, i, arr) {
            telegram.sendMessage(item.user.id, `Го тут создали!`).then((data) => {
                console.log(`отправлено ${JSON.stringify(data.chat.first_name)}`);
            }).catch((err) => {
                console.log(`не отправлено ${err}`);
            });
        });
    });
};


module.exports = {
    registerCommandHandlers,
    init
}