module.exports = function (session, parameters) {
    session.send(`Want more ? ${JSON.stringify(parameters)}`);
};
