import React from 'react';
import * as d3 from 'd3';
import * as _ from 'underscore';
import { ORFrame } from 'semiotic';
import Legend from './Legend';
import '../styles/Chart.css';

let margin = { left: 60, top: 15, bottom: 30, right: 15 };

export default class Chart extends React.Component {

    render() {
        // meta
        let meta = this.props.meta;
        margin.left = +meta.left;
        meta.ticks = +meta.ticks;
		console.log(meta);

		let color = this.props.color;
        let type = meta.bartype === 'point' ? { type: 'point', r: 8 } : meta.bartype;
        let direction = meta.direction;
        let orientation = meta.direction === 'vertical' ? 'left' : 'bottom';

        let formStr = meta.format === 'dollar' ? '$.2s' : '.0%';
        let format = d3.format(formStr);

        let annotations = _.chain(this.props.data)
            .filter((d) => d.label && d.label.length > 0)
            .each((d) => {
                d.type = 'or';
                d.className = meta.annClass;
            })
            .value();


        let axis = {
            orient: orientation,
            tickFormat: d => format(d),
            ticks: meta.ticks
        };

        let max = meta.max === 'fill' ? 1.0 : d3.max(this.props.data, d => d.y);

        return (
            <div className="Chart">
                <div className="chart-title">
                    <h3>{this.props.titles.chartH1}</h3>
                    <h5 className="fat-skinny">{this.props.titles.chartH3}</h5>
                </div>
                <ORFrame
                    size={this.props.size}
                    responsiveWidth={true}
                    responsiveHeight={true}
                    data={this.props.data}
                    type={type}
                    projection={direction}
                    oPadding={30}
                    oAccessor={'x'}
                    rAccessor={'y'}
                    rExtent={[0, max]}
                    style={ d => { return { fill: color(d.z) }} }

                    margin={margin}
                    oLabel={true}
                    axis={axis}
                    annotations={annotations}

                />
                <Legend color={color} hasLegend={this.props.meta.hasLegend} />
            </div>
        );
    }
}
