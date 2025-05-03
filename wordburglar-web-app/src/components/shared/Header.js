import React from 'react'
import LogoText from './LogoText'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <a className="navbar-brand" href="#">
                <LogoText fontSize="1.5rem" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a 
                            className="nav-link text-white" 
                            href="#" 
                            style={{ textDecoration: 'none' }}
                        >
                            New Session
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            className="nav-link text-white" 
                            href="#" 
                            style={{ textDecoration: 'none' }}
                        >
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}