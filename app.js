var token = process.argv[2] || process.env.TOKEN;
var steelassholesGroupId = process.argv[3] || process.env.GROUPID;
var hostname = process.env.HOSTNAME;


const fs = require('fs');
const Telegraf = require('telegraf');
const Telegram = require('telegraf').Telegram;
const telegram = new Telegram(token, { agent: null });
const app = new Telegraf(token);

const tlsOptions = {
  key:  fs.readFileSync('YOURPRIVATE.key'),
  cert: fs.readFileSync('YOURPUBLIC.pem')
}

// Http webhook, for nginx/heroku users.
app.telegram.setWebhook(hostname + token, {
    content: 'YOURPUBLIC.pem'
})

//app.startWebhook('/' + token, null, 5000);

app.startWebhook('/' + token, tlsOptions, 8443)

const hears = require('./hears');
const commands = require('./commands');

var hearsDictionary;
fs.readFile('hears.json', 'utf8', function (err, data) {
    if (err) {
        console.log(`Can't read hears.json`);
    }
    else {
        hearsDictionary = JSON.parse(data);
        hears.init(app, hearsDictionary);
        hears.hears();
    }
});

var users;
fs.readFile('users.json', 'utf8', function (err, data) {
    if (err) {
        console.log(`Can't read users.json`);
    }
    else {
        users = JSON.parse(data);
        commands.init(app, users, telegram);
        commands.registerCommandHandlers();
    }
});

app.on('sticker', (ctx) => ctx.reply('👍'));

app.catch((err) => {
    console.log('Ooops', err);
})

app.startPolling();


module.exports = {
    app
}