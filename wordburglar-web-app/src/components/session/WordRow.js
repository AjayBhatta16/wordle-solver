import React from 'react'
import { useDispatch } from 'react-redux'

import LetterTile from './LetterTile'
import * as ActiveWordActions from '../../state/actions/active-word.actions'

export default function WordRow(props) {
    const dispatch = useDispatch()

    const handleNotWord = () => {
        dispatch(ActiveWordActions.notAWord(props.word))
    }

    const handleSubmit = () => {
        dispatch(ActiveWordActions.guessSubmit())
    }

    return (
        <div className="word-row">
            {props.word.split('').map((letter, index) => (
                <LetterTile 
                    key={index} 
                    index={index}
                    letter={letter}
                    active={props.active}
                    wordHistoryIndex={props.index}
                />
            ))}
            {
                props.active && (
                    <div className="d-flex flex-column mt-2 ml-2">
                        <button 
                            className="btn btn-secondary mb-2"
                            onClick={handleNotWord}
                        >Not A Word</button>
                        <button 
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >Submit</button>
                    </div>
                )
            }
        </div>
    )
}