import React from 'react'
import LogoText from './LogoText'
import useCustomRouter from '../../hooks/useCustomRouter'

export default function Header() {
    const customRouter = useCustomRouter()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <a className="navbar-brand" href="/">
                <LogoText fontSize="1.5rem" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse nunito-light" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item" onClick={() => customRouter.goToSession()}>
                        <span 
                            className="nav-link text-white cursor-pointer" 
                            style={{ textDecoration: 'none' }}
                        >
                            New Session
                        </span>
                    </li>
                    <li className="nav-item" onClick={customRouter.goToAbout}>
                        <span 
                            className="nav-link text-white cursor-pointer" 
                            style={{ textDecoration: 'none' }}
                        >
                            About
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}