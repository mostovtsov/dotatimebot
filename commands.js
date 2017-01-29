const hears = require('./hears');
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

    app.command(['help', '/help@DotaTimeBot', 'help@DotaTimeBot'], (ctx) => {
        console.log('/help', ctx.from.first_name);
        ctx.reply(`/dota - Send notification to team members`);
        ctx.reply(`/last - Get latest played matches`);
        ctx.reply(`/twitch - Watch dota 2 streams`);
        ctx.reply(`/update - Update bot hears configuration`);
        ctx.reply(`/help - Show available commands`);
        ctx.reply(`/editor - Return editor URL`);
    });

    app.command(['last', '/last@DotaTimeBot', 'last@DotaTimeBot'], (ctx) => {
        console.log('last', ctx.from.first_name);
        var user = users.find(u => u.user.id === ctx.from.id);
        if (user) {
            ctx.reply(user.URL);
        }
    });

    app.command(['update', '/update@DotaTimeBot', 'update@DotaTimeBot'], (ctx) => {
        console.log('update', ctx.from.first_name);
        hears.init(app);
        hears.updateHears();
        ctx.reply('Hears updated');
    });

    app.command(['twitch', '/twitch@DotaTimeBot', 'twitch@DotaTimeBot'], (ctx) => {
        console.log('twitch', ctx.from.first_name);
        ctx.reply(`https://www.twitch.tv/directory/game/Dota%202/ru`);
    });

     app.command(['editor', '/editor@DotaTimeBot', 'editor@DotaTimeBot'], (ctx) => {
        console.log('editor', ctx.from.first_name);
        ctx.reply(`https://dotatimebotapi.herokuapp.com/`);
    });

    app.command(['dota', '/dota@DotaTimeBot', 'dota@DotaTimeBot'], (ctx) => {
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