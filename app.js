const Telegraf = require('telegraf');
const steelassholesGroupId = -1001039990033;
const fs = require('fs');
var users;
fs.readFile('users.json', 'utf8', function (err, data) {
    if (err)
        console.log(`Can't read users.json file`);
    //throw err;
    users = JSON.parse(data);
});

const token = '305297288:AAGNw0Tdxg_Ujqsm_Ip4W_hv5rSRmAZYWUc';
const app = new Telegraf(token);

const { Telegram } = require('telegraf');
const telegram = new Telegram(token, { agent: null })


// telegram.getChat(steelassholesGroupId).then((data) => {
//     console.log(JSON.stringify(data));
// });

// telegram.getChatAdministrators(steelassholesGroupId).then((data) => {
//     console.log(JSON.stringify(data));
// })

//console.log(telegram.getChatMember('DGu4YD38_REXuFUrWmpizw'));

app.command('start', (ctx) => {
    console.log('start', ctx.from);
    ctx.reply('Welcome!');
});

app.command('help', (ctx) => {
    console.log('help', ctx.from);
    ctx.reply(`dota - to start notify group members for starting game`);
    ctx.reply(`last - to show last matches URL from dotabuff.com`);
});

app.command('last', (ctx) => {
    console.log('last', ctx.from);
    var user = users.find(u => u.user.id === ctx.from.id);
    if (user) {
        ctx.reply(user.URL);
    }
});

// app.command('go', (ctx) => {
//     console.log('go', ctx.from);
//     ctx.reply('Go Go Go!!!');
// })

app.command('dota', (ctx) => {
    // var date = new Date();
    // console.log(`start at ${date.getDate()}`, ctx.from);


    // for (i = 0; i < 10; i++) {
    //     setTimeout(function () {
    //         ctx.reply('Го я создал!!!');
    //     }, 1000);
    // }

    users.forEach(function (item, i, arr) {
        telegram.sendMessage(item.user.id, `Го тут создали!`).then((data) => {
            console.log(`отправлено ${JSON.stringify(data.chat.first_name)}`);
        }).catch((err) => {
            console.log(`не отправлено ${err}`);
        });
    });


})

app.catch((err) => {
    console.log('Ooops', err)
})


app.hears('hi', (ctx) => ctx.reply('Hey there!'));
app.hears('писос', (ctx) => ctx.reply('Сам ты писос!'));
app.hears('лесник', (ctx) => ctx.reply('Лесники это ЗБС!'));
app.hears('славик', (ctx) => ctx.reply('ЛОХ'));
app.hears('Александр', (ctx) => ctx.reply('Уважаемый'));
app.hears('макс', (ctx) => ctx.reply('вор'));
app.hears('костя', (ctx) => ctx.reply('вор'));



app.hears('Go', (ctx) => ctx.reply('Go Go Go!'));
app.hears('go', (ctx) => ctx.reply('Go Go Go!'));

app.on('sticker', (ctx) => ctx.reply('👍'));

app.startPolling();