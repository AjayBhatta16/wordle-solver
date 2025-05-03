import React from 'react'

export default function SwankyButton(props) {
    return (
        <button 
            className={`btn mt-4 mx-2 fontdiner-swanky-regular swanky-button ${props.colorClass}`}
            onClick={props.onClick}
        >
            {props.textContent}
        </button>
    )
}