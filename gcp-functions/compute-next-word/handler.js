const fs = require('fs');

class ComputeNextWordHandler {
    constructor() {
        this.frequencies = JSON.parse(
            fs.readFileSync('./frq-index.json', 'utf8')
        );

        this.words = fs
            .readFileSync('words.txt', 'utf8')
            .split('\n')
            .map(word => word.trim().toLowerCase());
    }

    handle(request) {
        console.log('ComputeNextWordHandler - Handling request:', JSON.stringify(request));

        const validWords = this.getValidWords(request.session);

        console.log('ComputeNextWordHandler - Valid words:', validWords);

        const bestWord = this.getBestWord(validWords);

        console.log('ComputeNextWordHandler - Best word:', bestWord);

        return { bestWord };
    }

    getValidWords(session) {
        console.log('ComputeNextWordHandler - word count:', this.words.length);
        
        console.log('validateWord - correct count:', this.words.filter((word) => this.checkCorrect(session, word)).length);
        console.log('validateWord - misplaced count:', this.words.filter((word) => this.checkMisplaced(session, word)).length);
        console.log('validateWord - incorrect count:', this.words.filter((word) => this.checkIncorrect(session, word)).length);
        console.log('validateWord - notwords count:', this.words.filter((word) => this.checkNotWords(session, word)).length);

        return this.words.filter(word =>
            this.validateWord(session, word)
        );
    }

    validateWord(session, word) {
        return this.checkCorrect(session, word) &&
            this.checkMisplaced(session, word) &&
            this.checkIncorrect(session, word) &&
            this.checkNotWords(session, word);
    }

    checkCorrect(session, word) {
        return ![1, 2, 3, 4, 5].some(i => 
            session.correct[`ch_${i}`].length > 0 && session.correct[`ch_${i}`].toLowerCase() !== word[i - 1]
        );
    }

    checkMisplaced(session, word) {
        return !session.misplaced.some(ch => 
            word.indexOf(ch.value.toLowerCase()) === -1 
            || word[ch.pos] === ch.value.toLowerCase()
        );
    }

    checkIncorrect(session, word) {
        return !session.incorrect.some(ch => word.indexOf(ch.value.toLowerCase()) !== -1);
    }

    checkNotWords(session, word) {
        return !session.notWords.some(notWord => word.toLowerCase() === notWord.toLowerCase());
    }

    getBestWord(words) {
        return words.reduce((bestWord, currentWord) => {
            const currentScore = this.wordScore(currentWord);
            const bestScore = this.wordScore(bestWord);
            return currentScore > bestScore ? currentWord : bestWord;
        }, words[0]);
    }

    wordScore(word) {
        return [...new Set(word.split(''))].reduce((score, ch) => 
            score + this.frequencies[ch] || 0, 0
        );
    }
}

module.exports = ComputeNextWordHandler;