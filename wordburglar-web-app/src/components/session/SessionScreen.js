import React from 'react'
import { useSelector } from 'react-redux'

import WordRow from './WordRow'
import StandardContainer from '../shared/StandardContainer'
import Header from '../shared/Header'

export default function SessionScreen() {
    const session = useSelector((state) => state.session)

    return (
        <>
            <Header />
            <StandardContainer>
                <div className="mt-5">
                    {
                        (session.guessSequence ?? []).reverse().map((word, index) => (
                            <WordRow
                                key={index}
                                index={index}
                                word={word}
                                active={ index === 0 }
                            />
                        ))
                    }
                    <WordRow word="AROSE" active={true} />
                </div>
            </StandardContainer>
        </>
    )
}