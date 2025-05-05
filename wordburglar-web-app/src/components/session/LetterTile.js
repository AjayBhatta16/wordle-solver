import React from 'react'

export default function LetterTile(props) {
    return (
        <div className="text-center my-2 mx-1 letter-tile-container">
            <div className="letter-tile d-flex justify-content-center align-items-center w-100 bg-white font-bold mb-2"
            >
                {props.letter}
            </div>
            <div className="d-flex flex-row w-100 flex-wrap align-items-center justify-content-center">
                <button
                    className="btn feedback-button btn-custom-red mb-2 mx-1 d-flex justify-content-center align-items-center"
                    onClick={() => {}}
                >
                    X
                </button>
                <button
                    className="btn feedback-button btn-custom-purple mb-2 mx-1 d-flex justify-content-center align-items-center"
                    onClick={() => {}}
                >
                    +
                </button>
                <button
                    className="btn feedback-button btn-custom-blue mb-2 mx-1 d-flex justify-content-center align-items-center"
                    onClick={() => {}}
                >
                    ✓
                </button>
            </div>
        </div>
    );
}