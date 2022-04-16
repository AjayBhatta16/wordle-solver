const fs = require('fs')
const prompt = require('prompt-sync')()

let words = []
let data = fs.readFileSync('words.txt', 'utf8')
words = data.split('\n')

let correct = [null, null, null, null, null]
let misplaced = []
let wrong = []
let notaword = []

let frqs = {}

words.forEach(word => {
    word.split('').forEach((ch, i) => {
        if(word.indexOf(ch) == i) frqs[ch] = frqs[ch] ? (frqs[ch] + 1) : 1
    })
})

function checkValid(word) {
    return checkCorrect(word) && checkMisplaced(word) && checkWrong(word) && isaword(word)
}

// returns true if all known correct letters are in place
function checkCorrect(word) {
    let output = true
    correct.forEach((ch, i) => {
        if(!ch) return 
        if(word[i] != ch) output = false 
    })
    return output
}

// returns true if all misplaced letters are found at another index
function checkMisplaced(word) {
    let output = true 
    misplaced.forEach(ch => {
        if(word.indexOf(ch.value) == -1 || word[ch.pos] == ch.value) output = false 
    })
    return output 
}

// returns true if no wrong letters are found
function checkWrong(word) {
    let output = true
    let rem = word.split('').map((ch,i) => correct[i] ? '' : ch).join('')
    wrong.forEach((ch) => {
        if(rem.indexOf(ch) != -1) output = false 
    })
    return output 
}

function wordScore(word) {
    let uniqueLetters = []
    let score = 0
    word.split('').forEach((ch, i) => {
        if(word.indexOf(ch) == i) uniqueLetters.push(ch)
    })
    uniqueLetters.forEach(ch => {
        score += frqs[ch]
    })
    return score 
}

function isaword(word) {
    return notaword.filter(w => w == word).length == 0
}

function getBestWord() {
    let bestWord = words[0]
    words.forEach(word => {
        if(wordScore(word) > wordScore(bestWord) && checkValid(word)) {
            bestWord = word 
        }
    })
    return bestWord 
}

let nextWord = getBestWord()
console.log(`starting word: ${nextWord}`)
function mainLoop() {
    let result 
    for(let i = 0; i < 5; i++) {
        if(correct[i]) continue
        result = prompt(`Letter ${i+1} - enter c for correct, m for misplaced, w for wrong: `)
        if(result == 'x') {
            notaword.push(nextWord)
            break
        }
        if(result == 's') break
        if(result == 'c') correct[i] = nextWord[i]
        if(result == 'm') misplaced.push({value: nextWord[i], pos: i})
        if(result == 'w') wrong.push(nextWord[i])
    }
    if(getBestWord() == nextWord) {
        console.log("wordle solved")
        return
    }
    nextWord = getBestWord()
    console.log(`next word: ${nextWord}`)
    mainLoop()
}
mainLoop()

