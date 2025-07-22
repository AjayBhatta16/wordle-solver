import * as ActiveWordActions from '../actions/active-word.actions'

const initialState = {
    board: Array(5).fill(ActiveWordActions.GuessStatusTypes.BLANK),
    activeWord: '',
    wordHistory: [],
}

export const activeWord = (state = initialState, action) => {
    switch (action.type) {
        case ActiveWordActions.TypeConstants.LETTER_STATUS_UPDATE:
            return {
                ...state,
                board: state.board.map((status, index) =>
                    index === action.position ? action.status : status
                ),
            }
        case ActiveWordActions.TypeConstants.NOT_A_WORD:
            return {
                ...state,
                activeWord: '',
                wordHistory: [
                    ...state.wordHistory,
                    {
                        word: action.word,
                        statusCodes: Array(5).fill(ActiveWordActions.GuessStatusTypes.BLANK),
                    }
                ]
            }
        case ActiveWordActions.TypeConstants.RESET_BOARD:
            return {
                ...state,
                wordHistory: [
                    ...state.wordHistory,
                    { 
                        word: state.activeWord,
                        statusCodes: state.board,
                    }
                ],
                board: Array(5).fill(ActiveWordActions.GuessStatusTypes.BLANK),
                activeWord: action.newWord,
            }
        default:
            return state
    }
}