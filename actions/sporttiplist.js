const axios     = require('axios');
const sportsIds = require('./sports.json');

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

    if (!parameters.sport) {
        request = axios.get(tipsUrl, {
            headers: token
        }).then(res => {
            const tips = res.data.slice(0, 3).map(tip => formatTip(tip, true));

            session.send('Sport Tip List:\n\n' + tips.join('--\n\n'));
        })
    } else {
        request = axios.post(filterUrl, {
            dynamicProperties: {
                sportId: sportsIds[parameters.sport.toLowerCase()]
            }
        }, {
            headers: token
        }).then(res => {
            const tips = res.data.slice(0, 3).map(tip => formatTip(tip));

            session.send('Sport Tip List:\n\n' + tips.join('--\n\n'));
        })
    }

    request.catch(err => {
        console.log(err);
    });
};
