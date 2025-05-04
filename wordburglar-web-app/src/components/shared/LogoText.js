import React from 'react'

const LOGO_TEXT = 'Word Burglar'

function getClassName(idx) {
    switch (idx % 3) {
        case 0: return 'text-custom-purple'
        case 1: return 'text-custom-blue'
        case 2: return 'text-custom-red'
    }
}

export default function LogoText(props) {
    return (
        <h1 className="fontdiner-swanky-regular" style={{ fontSize: props.fontSize ?? '2rem' }}>
            { LOGO_TEXT.split('').map((ch, idx) => (
                <span className={getClassName(idx)} key={idx}>{ch}</span>
            )) }
        </h1>
    )
}