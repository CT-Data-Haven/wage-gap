import React from 'react';
import '../styles/Tooltip.css';

export default class Tooltip extends React.Component {
    render() {
        if (!this.props.isHovering) {
            return null;
        }
        let displayVal = this.props.format(this.props.val);
        return (
            <div className="Tooltip">
                <span className="tip-name">{this.props.name}: </span><span className="tip-val">{displayVal}</span>
            </div>
        );


    }
}
