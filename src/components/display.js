import React from 'react';

const Display = (props) => {
    console.log(props.output);
    return (
        <div id="display" className="display" dangerouslySetInnerHTML={{ __html: props.output }} />
    )
}

export default Display;