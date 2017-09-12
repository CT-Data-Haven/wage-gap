import React, { Component } from 'react';
import { queue, csv, interval } from 'd3';
import * as _ from 'underscore';
import { Grid, Row, Col } from 'react-bootstrap';
import { Affix, AutoAffix} from 'react-overlays';

import Text from './components/Text';
import Chart from './components/Chart';

// import Scroller from './components/Scroller';
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            step: 0
        };

    }

    getStep = (el) => {
        let step = el.id.slice(-1);
        this.setState({
            step: step
        });
    }

    render() {
        let step = this.state.step;
        let style = this.props.style;
        let text = _.pluck(this.props.json, 'md');
        let titles = _.pluck(this.props.json, 'titles');

        return (
            <div className="App">
                <Grid className="padded-grid">
                    <h1>The many wage gaps in Connecticut</h1>
                    <Row>
                        <Col sm={5}>
                            <Text
                                text={text}
                                onChange={this.getStep}
                            />
                        </Col>
                        <Col sm={7}>
                            <AutoAffix autoWidth={false} className="Affix" id="affix">
                                <div><Chart
                                    data={this.props.data[this.state.step].values}
                                    meta={this.props.meta[this.state.step]}
                                    style={this.props.style}
                                    titles={titles[this.state.step]}
                                /></div>
                            </AutoAffix>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
