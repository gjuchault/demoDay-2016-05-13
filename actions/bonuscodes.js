module.exports = function (session, parameters) {
    session.send('Bonus codes ' + JSON.stringify(parameters));
};
