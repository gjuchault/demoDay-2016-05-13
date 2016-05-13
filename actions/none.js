module.exports = function (session, _, query) {
    session.send(`Did not understand "${query}"...`);
};
