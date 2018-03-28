import React from 'react';
import Buttons from './buttons';

const Display = () => {
    return (
        <div className="Display">#</div>
    )
}

const Calculator = () => {
    return (
        <div className="calculator">
            <Display />
            <Buttons />
        </div>
    )
}

export default Calculator;