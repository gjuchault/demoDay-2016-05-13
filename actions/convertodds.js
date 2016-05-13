const Fraction = require('fractional').Fraction;

function toImpliedProbability(type, value) {
    const nValue = parseFloat(value);

    if (nValue === 0) {
        return '0%';
    }

    if (type === 'decimal' || type === 'decimal odds') {
        return (1 / nValue * 100) + '%';
    }

    if (type === 'fractional' || type === 'fractional odds') {
        const spltited = value.split('/');
        if (spltited.lenth !== 2) {
            return '0%';
        }

        const numerator   = splitted[0];
        const denominator = splitted[1];

        return (denominator / (denominator + numerator) * 100) + '%';
    }

    if (type === 'implied' || type === 'implied probability') {
        return value;
    }

    return null;
}

function fromImpliedProbability(type, value) {
    const nValue = parseFloat(value);

    if (nValue === 0) {
        return 0;
    }

    if (type === 'decimal' || type === 'decimal odds') {
        return 100 / nValue;
    }

    if (type === 'fractional' || type === 'fractional odds') {
        const frac = new Fraction((100 / nValue) - 1);

        return `${frac.numerator}/${frac.denominator}`;
    }

    if (type === 'implied' || type === 'implied probability') {
        return value;
    }

    return null;
}

module.exports = function (session, parameters) {
    const fromType = parameters['oddsType-from'];
    const toType   = parameters['oddsType-to'];
    const value    = parameters.value;

    console.log('convert ' + value + ' from ' + fromType + ' to ' + toType);
    console.log('implied ' + toImpliedProbability(fromType, value));

    const newValue = fromImpliedProbability(toType, toImpliedProbability(fromType, value));

    session.send('Odds converted : ' + newValue);
};
