import React, { Component } from 'react';
import { nest, scaleOrdinal } from 'd3';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactResizeDetector from 'react-resize-detector';

import Text from './components/Text';
import Chart from './components/Chart';
import Pager from './components/Pager';

import './App.css';

const initData = require('./data/wage_gap_data.json');
const meta = require('./data/wage_gap_meta.json');
const text = require('./data/wage_gap_text.json');

const colorTypes = {
	colorByLoc: {
		domain: [ 'US', 'Connecticut' ],
		range: [ '#495B7A', '#25A89D' ]
	},
	colorBySex: {
		domain: [ 'Men', 'Women' ],
		range: [ '#2555a8', '#d83a7c' ]
	},
	colorByType: {
		domain: [ 'Full-time', 'Part-time' ],
		range: [ '#25a89d', '#78d7a3' ]
	}
};


class App extends Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            // default size
            width: 500,
            height: 400,
			data: []
        };
        this.onResize = this.onResize.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
    }

	componentWillMount() {
		let clean = initData;
		clean.forEach((d) => d.y = +d.y);
		this.split = nest()
			.key((d) => d.step)
			.entries(clean);
		this.meta = meta;
        this.text = text;
		this.setState({
			data: this.split[0].values
		});
	}

    onResize = (w, h) => {
        let width = Math.round(0.9 * w);
        let height = Math.round(width * 0.6);

        this.setState({
            width: width,
            height: height
        });
    };

    onPageChange = (e) => {
		let step = e - 1;
		let data = this.split[step].values;
        this.setState({
            step: step,
			data: data
        });
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
                <Grid>
                    <h1 className="title">The many wage gaps in Connecticut</h1>
                    <Row>
                        <Col sm={5} lg={4}>
                            <Text text={this.text[step].md} />
                        </Col>
                        <Col sm={7} lg={8}>

                            <Chart
                                data={data}
                                meta={this.meta[step]}
                                // style={this.props.style}
                                titles={this.text[step].titles}
                                size={[ this.state.width, this.state.height ]}
								color={color}
                            />

                            <Pager
                                onPageChange={this.onPageChange}
                                items={this.split.length}
                                activePage={step + 1}
                            />

                            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <footer>
                                <p>Source: DataHaven analysis (2017) of US Census Bureau American Community Survey 2015 5-year estimates. <a href="http://www.ctdatahaven.org/">ctdatahaven.org</a></p>
                                <p><a href="https://github.com/CT-Data-Haven/wage-gap/blob/master/wage_gap_download.csv" target="_blank">DOWNLOAD THE DATA</a></p>
                            </footer>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default App;
