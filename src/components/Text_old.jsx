import React from 'react';
import * as _ from 'underscore';
// import Waypoint from 'react-waypoint';
import Scrollspy from 'react-scrollspy';
import { Col } from 'react-bootstrap';
import { Affix } from 'react-overlays';
import ReactMarkdown from 'react-markdown';
import '../styles/Text.css';

export default class Text extends React.Component {
    constructor(props) {
        super(props);

        // let splitTxt = props.text.split('---');

        this.ids = _.map(props.text, function(txt, i) {
            return {
                key: i,
                id: `step${i}`,
                href: `#step${i}`,
                text: txt
            };
        });

        this.onChange = this.props.onChange.bind(this);
    }

    render() {
        let textblocks = _.map(this.ids, function(d) {
            return <section key={d.key} id={d.id} className="text-block">
                {/* {d.key} {d.text} */}
                <ReactMarkdown source={d.text} />
            </section>;
        });
        let scrollItems = _.map(this.ids, function(d) {
            return <li key={d.key}><a href={d.href}>{d.id}</a></li>
        });

        return (
            <div className="Text">
                <Scrollspy
                    items={_.pluck(this.ids, 'id')}
                    currentClassName="is-current"
                    offset={-160}
                    onUpdate={this.onChange}
                    className="scroll-ul"
                >
                        {scrollItems}
                </Scrollspy>

                <div>{textblocks}</div>
                {/* <ReactMarkdown source={this.props.text} /> */}
            </div>
        );
    }
}
