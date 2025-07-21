import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as ActiveWordActions from '../../state/actions/active-word.actions'

export default function LetterTile(props) {
    const dispatch = useDispatch()

    const handleFeedback = (status) => {
        dispatch(ActiveWordActions.letterStatusUpdate(props.index, status))
    }

    const getStatusColorClass = (status) => {
        switch (status) {
            case ActiveWordActions.GuessStatusTypes.CORRECT:
                return props.active ? 'bg-custom-blue' : 'bg-custom-muted-blue'
            case ActiveWordActions.GuessStatusTypes.MISPLACED:
                return props.active ? 'bg-custom-purple' : 'bg-custom-muted-purple'
            case ActiveWordActions.GuessStatusTypes.INCORRECT:
                return props.active ? 'bg-custom-red' : 'bg-custom-muted-red'
            default:
                return props.active ? 'bg-white' : 'bg-custom-muted-white'
        }
    }

    const status = useSelector((state) => {
        if (props.active) {
            return state.activeWord.board[props.index]
        }

        return state.activeWord.wordHistory[
            state.activeWord.wordHistory.length - props.wordHistoryIndex
        ]?.statusCodes[props.index]
    })

    return (
        <div className="text-center my-2 mx-1 letter-tile-container">
            <div 
                className={`${getStatusColorClass(status)} letter-tile d-flex justify-content-center align-items-center w-100 font-bold mb-2`}
            >
                {props.letter.toUpperCase()}
            </div>
            {
                props.active && (
                    <div className="d-flex flex-row w-100 flex-wrap align-items-center justify-content-center">
                        <button
                            className="btn feedback-button btn-custom-red mb-2 mx-1 d-flex justify-content-center align-items-center"
                            onClick={() => handleFeedback(ActiveWordActions.GuessStatusTypes.INCORRECT)}
                        >
                            X
                        </button>
                        <button
                            className="btn feedback-button btn-custom-purple mb-2 mx-1 d-flex justify-content-center align-items-center"
                            onClick={() => handleFeedback(ActiveWordActions.GuessStatusTypes.MISPLACED)}
                        >
                            +
                        </button>
                        <button
                            className="btn feedback-button btn-custom-blue mb-2 mx-1 d-flex justify-content-center align-items-center"
                            onClick={() => handleFeedback(ActiveWordActions.GuessStatusTypes.CORRECT)}
                        >
                            ✓
                        </button>
                    </div>
                )
            }
        </div>
    );
}