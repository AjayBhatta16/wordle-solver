import React from 'react'
import LetterTile from './LetterTile'

export default function WordRow(props) {
    return (
        <div className="word-row">
            {props.word.split('').map((letter, index) => (
                <LetterTile 
                    key={index} 
                    index={index}
                    letter={letter}
                />
            ))}
            <div className="d-flex flex-column mt-2 ml-2">
                <button className="btn btn-secondary mb-2">Not A Word</button>
                <button className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}