import React from 'react';
import * as d3 from 'd3';
// import { select } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';
import '../styles/Legend.css';

export default class Legend extends React.Component {
    componentDidMount() {
        this.drawLegend();
    }

    componentDidUpdate() {
        this.drawLegend();
    }

    drawLegend() {
        let legend = legendColor()
            .shapeWidth(60)
            .orient('horizontal')
            .labelAlign('start')
            .shapePadding(20)
            .scale(this.props.color);

        d3.select(this.refs.svg)
            .attr('transform', 'translate(80, 0)')
            .select('g')
            .attr('transform', 'translate(20, 0)')
            .call(legend)
            .style('visibility', this.props.hasLegend ? 'visible' : 'hidden');
    }

    render() {
        return (
            <div className="Legend">
                <svg ref="svg">
                    <g className="legend" />
                </svg>
            </div>
        );
    }
}
