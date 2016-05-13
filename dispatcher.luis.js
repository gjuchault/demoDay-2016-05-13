const axios   = require('axios');

const url = 'https://api.projectoxford.ai/luis/v1/application/preview?id=353981ee-b9a1-4609-aea1-344f82a1516b&subscription-key=47e8be4b76ba41bb8bf61649ff437dad&q=';

module.exports = function (query) {
    return axios
        .get(url + query)
        .then(res => {
            const topIntent   = res.data.topScoringIntent;
            const intent_     = topIntent.intent;
            const parameters_ = (topIntent.actions && topIntent.actions[0]) ? topIntent.actions[0].parameters : [];


            const intent     = intent_.replace(/\s/g, '').toLowerCase();
            const parameters = {};

            parameters_.forEach(parameter_ => {
                if (parameter_.value && parameter_.value[0]) {
                    parameters[parameter_.name] = parameter_.value[0].entity;
                } else {
                    parameters[parameter_.name] = null;
                }
            });

            return {
                intent,
                parameters
            };
        });
}
