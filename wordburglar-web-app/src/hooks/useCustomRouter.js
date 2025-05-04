import { useNavigate } from 'react-router-dom'

export default function useCustomRouter() {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }

    const goToAbout = () => {
        navigate('/about')
    }

    const goToSession = (sessionID) => {
        navigate(`/sessions`)
    }

    return { goToHome, goToAbout, goToSession }
}