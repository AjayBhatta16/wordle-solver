export const GuessStatusTypes = {
    CORRECT: 'CORRECT',
    INCORRECT: 'INCORRECT',
    MISPLACED: 'MISPLACED',
    BLANK: 'BLANK',
}

export const TypeConstants = {
    LETTER_STATUS_UPDATE: 'LETTER_STATUS_UPDATE',
    NOT_A_WORD: 'NOT_A_WORD',
    GUESS_SUBMIT: 'GUESS_SUBMIT',
    RESET_BOARD: 'RESET_BOARD',
}

export const letterStatusUpdate = (position, status) => ({
    type: TypeConstants.LETTER_STATUS_UPDATE,
    position,
    status,
})

export const notAWord = (word) => ({
    type: TypeConstants.NOT_A_WORD,
    word,
})

export const guessSubmit = () => ({
    type: TypeConstants.GUESS_SUBMIT,
})

export const resetBoard = (newWord) => ({
    type: TypeConstants.RESET_BOARD,
    newWord,
})