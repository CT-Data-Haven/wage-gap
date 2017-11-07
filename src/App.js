import React, { Component } from 'react';
import * as _ from 'underscore';
import { nest, scaleOrdinal } from 'd3';
import { Grid, Row, Col } from 'react-bootstrap';
// import { Affix, AutoAffix} from 'react-overlays';
import ReactResizeDetector from 'react-resize-detector';
import KeyBinding from 'react-keybinding-component';
import Scroll from 'react-scroll-elemelyn';

import Text from './components/Text';
import Chart from './components/Chart';

import './App.css';

const initData = require('./data/wage_gap_video.json');
const meta = require('./data/meta_video.json');
const text = require('./data/text_video.json');

let Element = Scroll.Element;

const colorTypes = {
    colorBySex: {
        range: [ '#2555a8', '#d83a7c' ],
        domain: [ 'Men', 'Women' ]
    },
    colorByLoc: {
        range: [ '#495B7A', '#25A89D' ],
        domain: [ 'US', 'Connecticut' ]
    },
    colorByType: {
        range: [ '#25a89d', '#78d7a3' ],
        domain: [ 'Full-time', 'Part-time' ]
    },
    colorForPie: {
        range: [ '#ecc4dd', '#d83a7c' ],
        domain: [ 'PieUnfill', 'PieFill' ]
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            // default size
            width: 600,
            height: 400,
            data: []
        };
        this.onResize = this.onResize.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.getKey = this.getKey.bind(this);
    }

    componentWillMount() {
        let clean = initData;
        clean.forEach((d) => d.y = +d.y);
        this.split = nest()
            .key((d) => d.step)
            .entries(clean);
        this.meta = meta;
        this.setState({
            data: this.split[0].values
        });
    }

    onResize = (w, h) => {
        let width = w;
        let height = Math.round(width * 2/3);

        this.setState({
            width: width,
            height: height
        });
    };

    onPageChange = (e) => {
        let step = e;
        this.setState({
            step: step,
            data: this.split[step].values
        });
    };

    getKey = (e) => {
        // console.log(e);
        let step = this.state.step;
        switch (e.key) {
            case 'ArrowRight':
                if (step < this.split.length - 1) {
                    this.onPageChange(step + 1);
                }
                break;
            case 'ArrowLeft':
                if (step > 0) {
                    this.onPageChange(step - 1);
                }
                break;
            case 'i':
                Scroll.scroller.scrollTo('textMarker', {
                    duration: 800,
                    smooth: true,
                    container: 'textContainer'
                });
                break;
            case 'ArrowDown':
                Scroll.scroller.scrollTo('sourceMarker', {
                    duration: 800,
                    smooth: true,
                    container: 'sourceContainer'
                });
                break;
            default:
                break;
        }
    };

    render() {
        let step = this.state.step;
        let colorType = colorTypes[this.meta[step].color];

        let color = scaleOrdinal()
            .domain(colorType.domain)
            .range(colorType.range);

        let data = this.state.data;

        return (
            <div className="App">
                <KeyBinding onKey={ this.getKey } />
                <Grid>
                    <h1 className="title">The many wage gaps in Connecticut</h1>
                    <Element name="textMarker"></Element>
                    <Row id="textContainer">
                        <Col sm={5}>
                            <Text text={text[step]} />
                        </Col>
                        <Col sm={7}>
                            <Chart
                                data={data}
                                meta={this.meta[step]}
                                color={color}
                                size={[ this.state.width, this.state.height ]}
                                text={text[step]}
                            />
                            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                        </Col>
                    </Row>
                    <Row id="sourceContainer">
                        <Col sm={12}>
                            <footer>
                                <Element name="sourceMarker"></Element>
                                <h2>Learn more at <a href="http://www.ctdatahaven.org/">ctdatahaven.org</a></h2>
                                <p>Source: DataHaven analysis (2017) of US Census Bureau American Community Survey 2015 5-year estimates.</p>
                            </footer>
                        </Col>
                    </Row>
                    <div id="logo"></div>
                </Grid>

            </div>
        );
    }
}

export default App;
