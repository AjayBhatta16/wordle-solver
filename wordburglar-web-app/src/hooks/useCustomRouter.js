import { useNavigate } from 'react-router-dom'
import { take } from 'rxjs'

import SessionService from '../services/session.service'

export default function useCustomRouter() {
    const navigate = useNavigate()
    const sessionService = new SessionService()

    const goToHome = () => {
        navigate('/')
    }

    const goToAbout = () => {
        navigate('/about')
    }

    const goToSession = (sessionID) => {
        if (!!sessionID) {
            sessionService.newSession().pipe(take(1)).subscribe((session) => {
                navigate(`/sessions/${session}`)
            })
        }
    }

    return { goToHome, goToAbout, goToSession }
}