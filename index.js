const restify = require('restify');
const builder = require('botbuilder');
const axios   = require('axios');

const dispatcher = require('./dispatcher');

const url = 'https://api.projectoxford.ai/luis/v1/application/preview?id=353981ee-b9a1-4609-aea1-344f82a1516b&subscription-key=47e8be4b76ba41bb8bf61649ff437dad&q=';

// Create bot and add dialogs
const bot = new builder.BotConnectorBot({ appId: 'bettercollectiveDemoday', appSecret: 'e725d4760e12476f9f89e8aebf5a4671' });

bot.add('/', session => {
    const msg = encodeURIComponent(session.message.text);

    console.log(msg);

    axios
        .get(url + msg)
        .then(res => {
            const topIntent = res.data.topScoringIntent;
            const intent     = topIntent.intent;
            const parameters = (topIntent.actions && topIntent.actions[0]) ? topIntent.actions[0].parameters : [];

            dispatcher(session, intent, parameters);
        })
        .catch(err => {
            console.log(err);

            session.send('Failed to use bot');
        });
});

// Setup Restify Server
const server = restify.createServer();

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.port || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});
