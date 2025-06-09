import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import * as SessionActions from '../state/actions/session.actions'

export default function useCustomRouter() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const session = useSelector((state) => state.session.session)

    useEffect(() => {
        if (session.sessionId) {
            navigate(`/sessions/${session.sessionId}`)
        }
    }, [session, navigate])

    const goToHome = () => {
        navigate('/')
    }

    const goToAbout = () => {
        navigate('/about')
    }

    const goToSession = (sessionID) => {
        console.log('goToSession - sessionID:', sessionID)
        if (!!sessionID) {
            dispatch(SessionActions.getSessionRequest(sessionID))
        } else {
            dispatch(SessionActions.newSessionRequest())
        }
    }

    return { goToHome, goToAbout, goToSession }
}