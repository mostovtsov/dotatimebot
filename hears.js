// module.exports = (app) => {
//     this.app = app;
// }


app.hears('hi', (ctx) => ctx.reply('Hey there!'));
app.hears('писос', (ctx) => ctx.reply('Сам ты писос!'));
app.hears('лесник', (ctx) => ctx.reply('Лесники это ЗБС!'));
app.hears('славик', (ctx) => ctx.reply('ЛОХ'));
app.hears('Александр', (ctx) => ctx.reply('Уважаемый'));
app.hears('макс', (ctx) => ctx.reply('вор'));
app.hears('костя', (ctx) => ctx.reply('вор'));
app.hears('Go', (ctx) => ctx.reply('Go Go Go!'));
app.hears('go', (ctx) => ctx.reply('Go Go Go!'));