import React from 'react';

const Display = (props) => {
    return (
        <div id="display" className="display" dangerouslySetInnerHTML={{ __html: props.output }} />
    )
}

export default Display;