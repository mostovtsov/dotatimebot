var app;

var hears = () => {
    const pisosRegEx = getAnyCaseRegex('писос');
    const foresterRegEx = getAnyCaseRegex('лесник')
    const sashaRegex = getAnyCaseRegex('александр');
    const slavaRegex = getAnyCaseRegex('славик');
    const maxRegex = getAnyCaseRegex('макс');
    const kostiyaRegex = getAnyCaseRegex('костя');
    const geibRegex = getAnyCaseRegex('гейб');

     if (app) {
        app.hears('hi', (ctx) => ctx.reply('Hey there!'));
        app.hears(pisosRegEx, (ctx) => ctx.reply('Сам ты писос!'));
        app.hears(foresterRegEx, (ctx) => ctx.reply('Лесники это ЗБС!'));
        app.hears(slavaRegex, (ctx) => ctx.reply('так себе игрок'));
        app.hears(sashaRegex, (ctx) => ctx.reply('Уважаемый'));
        app.hears(maxRegex, (ctx) => ctx.reply('вор'));
        app.hears(kostiyaRegex, (ctx) => ctx.reply('минипижек'));
        app.hears(geibRegex, (ctx) => ctx.reply('half life 3 не будет'));
        app.hears('go', (ctx) => ctx.reply('Go Go Go!'));
        app.hears('хуй', (ctx) => ctx.reply('хуюй'));
        app.hears('твоя мать', (ctx) => ctx.reply('даёт'));
        app.hears('дальше вы не пройдёте', (ctx) => ctx.reply('пока не получите бумаги'));
        app.hears('гавно твой бот', (ctx) => ctx.reply(`Да сам ты гавно ${ctx.from.first_name}`));
    }
}

var generateCharTemplate = (char) => {
    return `[${char.toLowerCase()}|${char.toUpperCase()}]`;
};

var getAnyCaseRegex = (word) => {
    var regStr = '(';

    for (i = 0; i < word.length; i++) {
        regStr += generateCharTemplate(word[i]);
    }

    regStr += ')';

    return new RegExp(regStr);
};

var init = (bot) => {
    app = bot;
}

module.exports = {
    hears,
    init
}