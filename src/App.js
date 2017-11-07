import React, { Component } from 'react';
import * as _ from 'underscore';
import { Grid, Row, Col } from 'react-bootstrap';
// import { Affix, AutoAffix} from 'react-overlays';
import ReactResizeDetector from 'react-resize-detector';

import Text from './components/Text';
import Chart from './components/Chart';
import Pager from './components/Pager';

import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            // default size
            width: 600,
            height: 400
        };
        this.onResize = this.onResize.bind(this);
    }

    onResize = (w, h) => {
        let width = Math.round(0.9 * w);
        let height = Math.round(width * 2/3);

        this.setState({
            width: width,
            height: height
        });
    };

    onPageChange = (e) => {
        this.setState({
            step: e - 1
        });
    };

    render() {
        let step = this.state.step;

        let text = _.pluck(this.props.json, 'md');
        let titles = _.pluck(this.props.json, 'titles');

        return (
            <div className="App">
                <Grid>
                    <h1 className="title">The many wage gaps in Connecticut</h1>
                    <Row>
                        <Col sm={6} md={4}>
                            <Text text={text[step]} />
                            <Pager
                                onPageChange={this.onPageChange}
                                items={text.length}
                                activePage={step + 1}
                            />
                        </Col>
                        <Col sm={6} md={8}>

                            <Chart
                                data={this.props.data[step].values}
                                meta={this.props.meta[step]}
                                style={this.props.style}
                                titles={titles[step]}
                                size={[ this.state.width, this.state.height ]}
                            />

                            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <footer>
                                <p>Source: DataHaven analysis (2017) of US Census Bureau American Community Survey 2015 5-year estimates. <a href="http://www.ctdatahaven.org/">ctdatahaven.org</a></p>
                            </footer>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default App;
