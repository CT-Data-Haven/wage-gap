import React from 'react';
import * as _ from 'underscore';
import '../styles/Text.css';

const Text = (props) => {
	let arr = props.text.text.split(';');
	let blocks = _.map(arr, (d, i) => <p key={i}>{d}</p>);
    return (
        <div className="Text">
            <h2>{ props.text.textHead }</h2>
            <div className="text-block">{ blocks }</div>
        </div>
    );
};

export default Text;
