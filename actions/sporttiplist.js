const axios = require('axios');

const url   = 'http://api-tips-staging.bettingexpert.com/v1/tips/filters?pageSize=3';
const token = { accesstoken: 'dev' };

const sportsIds = {
    'football'                 : 1,
    'tennis'                   : 2,
    'skiing'                   : 3,
    'athletics'                : 4,
    'australian football'      : 5,
    'cycling'                  : 6,
    'american football'        : 7,
    'bandy'                    : 8,
    'cricket'                  : 9,
    'floorball'                : 10,
    'formula 1'                : 11,
    'rugby'                    : 12,
    'snooker'                  : 13,
    'speedway'                 : 14,
    'waterpolo'                : 15,
    'volleyball'               : 16,
    'horse racing'             : 17,
    'basketball'               : 18,
    'icehockey'                : 19,
    'trotting'                 : 20,
    'other'                    : 21,
    'baseball'                 : 22,
    'boxing'                   : 23,
    'darts'                    : 24,
    'handball'                 : 25,
    'ski jumping'              : 26,
    'golf'                     : 27,
    'table tennis'             : 28,
    'politics'                 : 29,
    'cross country skiing'     : 30,
    'freestyle skiing'         : 31,
    'alpine'                   : 32,
    'biathlon'                 : 33,
    'motorsports'              : 34,
    'bobsleigh'                : 35,
    'curling'                  : 36,
    'figure skating'           : 37,
    'luge'                     : 38,
    'nordic combined'          : 39,
    'short track speed skating': 40,
    'skeleton'                 : 41,
    'snowboarding'             : 42,
    'speed skating'            : 43,
    'beach volley'             : 44,
    'archery'                  : 45,
    'badminton'                : 46,
    'canoeing'                 : 81,
    'diving'                   : 82,
    'equestrian'               : 83,
    'fencing'                  : 84,
    'hockey'                   : 85,
    'gymnastics'               : 86,
    'judo'                     : 87,
    'modern pentathlon'        : 88,
    'rowing'                   : 89,
    'sailing'                  : 90,
    'shooting'                 : 91,
    'swimming'                 : 92,
    'synchronised swimming'    : 93,
    'taekwondo'                : 95,
    'triathlon'                : 96,
    'weight lifting'           : 99,
    'wrestling'                : 100,
    'track cycling'            : 101,
    'mountain bike'            : 102,
    'softball'                 : 103,
    'bmx'                      : 104,
    'reference sport'          : 105,
    'mixed martial arts'       : 109,
    'futsal'                   : 112
};

function formatTip(tip) {
    return 'Match: ' + tip.data.matchTitle + '\n\n' +
           'Odds: ' + tip.odds + '\n\n';
}

module.exports = function (session, parameters) {
    axios
        .post(url, {
            dynamicProperties: {
                sportId: sportsIds[parameters.sport.toLowerCase()]
            }
        }, {
            headers: token
        })
        .then(res => {
            const tips = res.data.slice(0, 3).map(tip => formatTip(tip));

            session.send('Sport Tip List:\n\n' + tips.join('--\n\n'));
        })
        .catch(err => {
            console.log(err);
        });
};
