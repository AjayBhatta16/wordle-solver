/**
 * CLI tool for generating common solutions index
 * Run command: `npm run build-cs-idx`
 */

const fs = require('fs');
const ComputeNextWordHandler = require('./handler.js');

function toBase3DigitArray(num) {
    const base3 = [];
    while (num > 0) {
        base3.push(num % 3);
        num = Math.floor(num / 3);
    }
    while (base3.length < 5) {
        base3.push(0);
    }
    return base3.reverse();
}

const handler = new ComputeNextWordHandler();

const session = {
    sessionId: '00000000-0000-0000-0000-000000000000',
    lastUpdatedTimeStamp: Date.now(),
    correct: { ch_1: '', ch_2: '', ch_3: '', ch_4: '', ch_5: '' },
    misplaced: [],
    incorrect: [],
    notwords: []
};

function toSessionObj(num, word) {
    const digits = toBase3DigitArray(num);
    return {
        ...session,
        correct: {
            ch_1: digits[0] === 0 ? word[0] : '',
            ch_2: digits[1] === 0 ? word[1] : '',
            ch_3: digits[2] === 0 ? word[2] : '',
            ch_4: digits[3] === 0 ? word[3] : '',
            ch_5: digits[4] === 0 ? word[4] : ''
        },
        misplaced: [
            ...digits.map((digit, index) => {
                if (digit === 1) {
                    return { value: word[index], pos: index };
                }
                return null;
            }).filter(o => o !== null)
        ],
        incorrect: [
            ...digits.map((digit, index) => {
                if (digit === 2) {
                    return word[index];
                }
                return null;
            }).filter(o => o !== null)
        ],
        notwords: []
    };
}

const commonSolutions = [];

const bestWord = handler.handle({ session }).bestWord;
console.log('Best word:', bestWord);

commonSolutions.push({
    solutionKey: '',
    solution: bestWord,
});

for (let i = 0; i < 243; i++) {
    const sessionObj = toSessionObj(i, bestWord);
    const next = handler.handle({ session: sessionObj }).bestWord;

    commonSolutions.push({
        solutionKey: bestWord + '-' + toBase3DigitArray(i).join(''),
        solution: next,
    });
}

fs.writeFileSync(
    './common-solutions.json',
    JSON.stringify(commonSolutions, null, 2),
    'utf8'
);