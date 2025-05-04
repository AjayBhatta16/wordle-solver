import React from 'react'

import Header from '../shared/Header'
import StandardContainer from '../shared/StandardContainer'

export default function AboutScreen() {
    return (
        <>
            <Header />
            <StandardContainer>
                <div className="w-75 mx-auto text-center mt-5 nunito-light">
                    <h1 className="text-white">How a Greedy Heuristic Solves Word Puzzles</h1>
                    <p className="text-white mt-4">
                        A greedy heuristic is a simple yet powerful approach to solving problems like word puzzles. It works by making the best possible guess at each step based on the current information. It measures the information gain of every potential choice in order to optimize the process of elimination.
                    </p>
                    <div className="d-flex flex-wrap justify-content-center mt-5">
                        <div className="step-box bg-custom-red mx-2">
                            <h2>Step 1: Analyze Feedback</h2>
                            <p>
                                Use the feedback from your previous guesses to narrow down the list of possible words.
                            </p>
                        </div>
                        <div className="step-box bg-custom-blue mx-2 mt-2">
                            <h2>Step 2: Prioritize Letters</h2>
                            <p>
                                Focus on letters that appear most frequently in the remaining possible words.
                            </p>
                        </div>
                        <div className="step-box bg-custom-purple mx-2 mt-2">
                            <h2>Step 3: Make a Guess</h2>
                            <p>
                                Choose the word that maximizes the information gained for the next round.
                            </p>
                        </div>
                    </div>
                    <p className="text-white mt-5">
                        By repeating these steps, the greedy heuristic quickly zeroes in on the correct word!
                    </p>
                </div>
            </StandardContainer>
        </>
    )
}