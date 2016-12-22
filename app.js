const token = '305297288:AAGNw0Tdxg_Ujqsm_Ip4W_hv5rSRmAZYWUc';
const steelassholesGroupId = -1001039990033;

const fs = require('fs');
const Telegraf = require('telegraf');
const { Telegram } = require('telegraf');
const telegram = new Telegram(token, { agent: null });
const app = new Telegraf(token);

var users;
fs.readFile('users.json', 'utf8', function (err, data) {
    if (err)
        console.log(`Can't read users.json file`);
    users = JSON.parse(data);
});

var users = [];

app.command('start', (ctx) => {
    console.log('start', ctx.from.first_name);
    ctx.reply('Welcome!');
});

app.command('help', (ctx) => {
    console.log('help', ctx.from.first_name);
    ctx.reply(`dota - to start notify group members for starting game`);
    ctx.reply(`last - to show last matches URL from dotabuff.com`);
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

app.hears('hi', (ctx) => ctx.reply('Hey there!'));
app.hears('писос', (ctx) => ctx.reply('Сам ты писос!'));
app.hears('лесник', (ctx) => ctx.reply('Лесники это ЗБС!'));
app.hears('славик', (ctx) => ctx.reply('ЛОХ'));
app.hears('александр', (ctx) => ctx.reply('Уважаемый'));
app.hears('макс', (ctx) => ctx.reply('вор'));
app.hears('костя', (ctx) => ctx.reply('вор'));
app.hears('go', (ctx) => ctx.reply('Go Go Go!'));


app.on('sticker', (ctx) => ctx.reply('👍'));

app.catch((err) => {
    console.log('Ooops', err);
})

app.startPolling();

// module.exports = {
//     users,
//     app,
//     telegram
// }