var app;
var dictionary;

var hears = () => {
    if (app && dictionary) {
        dictionary.forEach(function (item, i, arr) {
            var regexArray = [];
            item.text.forEach((text, j, texts) => {
                regexArray.push(getAnyCaseRegex(text));
            });
            app.hears(regexArray, (ctx) => ctx.reply(item.answer));
        });

        app.hears(
            [getAnyCaseRegex('говно твой бот'),
            getAnyCaseRegex('говёный бот'),
            getAnyCaseRegex('бот говно'),
            getAnyCaseRegex('говно бот'),
            getAnyCaseRegex('твой бот говно')],
            (ctx) => ctx.reply(`Да сам ты говно ${ctx.from.first_name}`));
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

var init = (bot, hearsDictionary) => {
    app = bot;
    dictionary = hearsDictionary;
}

module.exports = {
    hears,
    init
}