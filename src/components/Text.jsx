import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Text.css';

const Text = (props) => {
    return (
        <div className="Text">
            <ReactMarkdown source={props.text} />
        </div>
    );
};

export default Text;
