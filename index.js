const restify = require('restify');
const builder = require('botbuilder');
const program = require('commander');
const fs      = require('fs');
const path    = require('path');

const dispatchers = {};

const availableDispatchers = fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('dispatcher') === 0)
    .map(file => file.slice('dispatcher.'.length, '.js'.length * -1))
    .map(file => {
        dispatchers[file] = require(`./dispatcher.${file}.js`);

        return file;
    })

const dispatcherRegex = new RegExp(`^(${availableDispatchers.join('|')})$`);

program
    .version('0.0.1')
    .option('-s --service <service>',
            `Choose webservice (available: ${availableDispatchers.join(', ')})`,
            dispatcherRegex,
            availableDispatchers[0])
    .parse(process.argv);

// Create bot and add dialogs
const bot = new builder.BotConnectorBot({ appId: 'bettercollectiveDemoday', appSecret: 'e725d4760e12476f9f89e8aebf5a4671' });

bot.add('/', session => {
    const q = encodeURIComponent(session.message.text);

    dispatchers[program.service](q)
        .then(res => {
            require(`./actions/${res.intent}`)(session, res.parameters, res.query);
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
    console.log('server listening to %s', server.url);
});
