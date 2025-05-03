import React from 'react'

import StandardContainer from '../shared/StandardContainer'
import Header from '../shared/Header'
import LogoText from '../shared/LogoText'
import SwankyButton from '../shared/SwankyButton'

export default function HomeScreen() {
    return (
        <>
            <Header />
            <StandardContainer>
                <div className="w-75 mx-auto text-center mt-5">
                    <LogoText fontSize="4rem" />
                </div>
                <div className="text-center mt-5 text-white">
                    <p className="mt-3 w-67 mx-auto">
                        WordBurglar is your ultimate tool for solving 5-letter word puzzles. <br/><br/>
                        Powered by a greedy heuristic algorithm, it helps you guess words with precision and ease.
                    </p>
                    <div className="flex w-100 mx-auto mt-5">
                        <SwankyButton
                            textContent="Guess a Word"
                            colorClass="btn-custom-blue"
                            onClick={() => {}}
                        />
                        <SwankyButton
                            textContent="How it Works"
                            colorClass="btn-custom-red"
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </StandardContainer>
        </>
    )
}