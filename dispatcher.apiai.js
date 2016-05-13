const axios   = require('axios');

const url = 'https://api.api.ai/api/query?v=20150910&lang=en&sessionId=fdc1bca2-c97a-4f6a-8244-a1c9a6928e0c&timezone=Europe/Copenhagen&query=';
const token = { Authorization: 'Bearer 67c3dd4be69f42e99fc0a6af1a75a57b' };

module.exports = function (query) {
    return axios
        .get(url + query, {
            headers: token
        })
        .then(res => {
            const topIntent   = res.data.result;

            console.log(topIntent);

            const intent_     = topIntent.action;
            const parameters_ = topIntent.parameters;

            const intent     = intent_.replace(/\s/g, '').toLowerCase();
            const parameters = {};

            Object.keys(parameters_).forEach(name => {
                if (parameters_[name] && parameters_[name].length > 0) {
                    parameters[name] = parameters_[name];
                }
            });

            return {
                intent,
                parameters,
                query: topIntent.resolvedQuery
            };
        });
}
