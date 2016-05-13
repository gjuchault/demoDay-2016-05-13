const restify = require('restify');
const builder = require('botbuilder');

// Create bot and add dialogs
const bot = new builder.BotConnectorBot({ appId: 'bettercollectiveDemoday', appSecret: 'e725d4760e12476f9f89e8aebf5a4671' });

bot.add('/', session => {
    session.send('Hello World');
});

// Setup Restify Server
const server = restify.createServer();

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

server.listen(process.env.port || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});
