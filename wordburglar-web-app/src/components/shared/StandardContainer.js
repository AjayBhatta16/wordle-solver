import React from 'react'

export default function StandardContainer(props) {
    return (
        <div className="container-fluid standard-background bg-custom-black">
            {props.children}
        </div>
    )
}