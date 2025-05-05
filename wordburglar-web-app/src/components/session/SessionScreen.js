import React from 'react'

import WordRow from './WordRow'
import StandardContainer from '../shared/StandardContainer'
import Header from '../shared/Header'

export default function SessionScreen() {
    return (
        <>
            <Header />
            <StandardContainer>
                <div className="mt-5">
                    <WordRow word="AROSE" />
                </div>
            </StandardContainer>
        </>
    )
}