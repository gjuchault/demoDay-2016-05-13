module.exports = function (session, intent_, parameters_) {
    const intent     = intent_.replace(/\s/g, '').toLowerCase();
    const parameters = {};

    parameters_.forEach(parameter_ => {
        if (parameter_.value && parameter_.value[0]) {
            parameters[parameter_.name] = parameter_.value[0].entity;
        } else {
            parameters[parameter_.name] = null;
        }
    });

    require(`./actions/${intent}`)(session, parameters);
};
