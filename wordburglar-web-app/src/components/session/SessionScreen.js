import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import WordRow from './WordRow'
import StandardContainer from '../shared/StandardContainer'
import Header from '../shared/Header'
import * as SessionActions from '../../state/actions/session.actions'

export default function SessionScreen() {
    const session = useSelector((state) => state.session.session)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        const sessionId = location.pathname.split('/').pop()
        if (session === null && !!sessionId) {
            dispatch(SessionActions.getSessionRequest(sessionId))
        } else if (!!session) {
            // dispatch(SessionActions.nextWordRequest(session))
        }
    }, [])

    console.log('SessionScreen render', session)

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
                </div>
            </StandardContainer>
        </>
    )
}