module.exports = function (session, parameters) {
    session.send('Sport Tip List ' + JSON.stringify(parameters));
};
