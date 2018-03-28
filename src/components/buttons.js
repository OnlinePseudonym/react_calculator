import React from 'react';
import Button from './button';

const buttonMap = [
    {
        content: '(',
        id: 'left-paren',
    },{
        content: ')',
        id: 'right-paren',
    },{
        content: '%',
        id: 'percent',
    },{
        content: 'C',
        id: 'clear',
    },{
        content: '7',
        id: 'seven',
    },{
        content: '8',
        id: 'eight',
    },{
        content: '9',
        id: 'nine',
    },{
        content: '÷',
        id: 'divide',
    },{
        content: '4',
        id: 'four',
    },{
        content:'5',
        id: 'five',
    },{
        content: '6',
        id: 'six',
    },{
        content: 'x',
        id: 'multiply',
    },{
        content: '1',
        id: 'one',
    },{
        content: '2',
        id: 'two',
    },{
        content: '3',
        id: 'three',
    },{
        content: '-',
        id: 'subtract',
    },{
        content: '0',
        id: 'zero',
    },{
        content: '.',
        id: 'decimal',
    },{
        content: '=',
        id: 'equals',
    },{
        content: '+',
        id: 'add',
    }
];

const Buttons = (props) => {
    const buttons = buttonMap.map(obj => <Button key={obj.content} id={obj.id} handleClick={props.handleClick} evaluate={props.evaluate} clear={props.clear} content={obj.content} />)
    return (
        <div className="buttons">
            {buttons}
        </div>
    )
}

export default Buttons;