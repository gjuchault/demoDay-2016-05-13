const axios     = require('axios');
const sportsIds = require('./sports.json');
const typesIds  = require('./types.json');

const tipsUrl   = 'http://api-tips-staging.bettingexpert.com/v1/tips?pageSize=3';
const filterUrl = 'http://api-tips-staging.bettingexpert.com/v1/tips/filters?pageSize=3';
const token     = { accesstoken: 'dev' };

function values(obj) {
    return Object.keys(obj).map(k => obj[k]);
}

function formatTip(tip, showSport) {
    const sportIdsValues = values(sportsIds);
    const sportIndex     = sportIdsValues.indexOf(tip.data.sportId);
    const sportName      = Object.keys(sportsIds)[sportIndex] || 'Unkown sport';

    const sport = sportName;

    return 'Match: ' + tip.data.matchTitle + '\n\n' +
            (showSport ? 'Sport: ' + sportName + '\n\n' : '') +
           'Odds: ' + tip.odds + '\n\n';
}

module.exports = function (session, parameters) {
    let request;

    const showSport = !Boolean(parameters.sport);

    if (!parameters.sport && !parameters.date && !parameters.type) {
        request = axios.get(tipsUrl, {
            headers: token
        }).then(res => {
            const tips = res.data.slice(0, 3).map(tip => formatTip(tip, showSport));

            session.send('Sport Tip List:\n\n' + tips.join('--\n\n'));
        })
    } else {
        const filters = {};

        if (parameters.sport) {
            filters.sportId = sportsIds[parameters.sport.toLowerCase()];
        }

        if (parameters.type) {
            filters.selectionTypeId = typesIds[parameters.type.toLowerCase()];
        }

        if (parameters.date) {
            filters.date = '';
            console.log('we should set date to ', parameters.date, 'here');
        }

        console.log(filters);

        request = axios.post(filterUrl, {
            dynamicProperties: filters
        }, {
            headers: token
        }).then(res => {
            const tips = res.data.slice(0, 3).map(tip => formatTip(tip, showSport));

            session.send('Sport Tip List:\n\n' + tips.join('--\n\n'));
        })
    }

    request.catch(err => {
        console.log(err);
    });
};
