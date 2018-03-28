import React from 'react';

const Button = (props) => {
    return (
        <button
        id={props.id}
        className="btn"
        onClick={props.content === '=' ? props.evaluate : props.content === 'C' ? props.clear : props.handleClick} >
            {props.content}
        </button>
    )
}

export default Button;