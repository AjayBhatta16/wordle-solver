/**
 * CLI tool for generating the letter frequency index
 * Run command: `npm run build-frq-idx`
 */

const fs = require('fs');

const rawData = fs.readFileSync('words.txt', 'utf8');
const words = rawData.split('\n').map(word => word.trim().toLowerCase());

const frequencies = {};

words.forEach(word => {
    word.split('').forEach((ch, i) => {
        if (word.indexOf(ch) === i) {
            frequencies[ch] = frequencies[ch] ? (frequencies[ch] + 1) : 1;
        }
    });
}); 

fs.writeFileSync('./frq-index.json', JSON.stringify(frequencies, null, 2), 'utf8');