import React from 'react';
import * as d3 from 'd3';
import * as _ from 'underscore';
import { ResponsiveORFrame } from 'semiotic';
import { annotationBadge } from 'd3-svg-annotation';
import Legend from './Legend';
import '../styles/Chart.css';

export default class Chart extends React.Component {
    makeColorScale(colortype) {
        let domain = this.props.style[colortype].labels;
        let range = this.props.style[colortype].colors;
        let hasLegend = this.props.style[colortype].hasLegend;
        let color = d3.scaleOrdinal()
            // .domain(d3.map((d) => d.x))
            .domain(domain)
            .range(range);
        return [ color, hasLegend ];
    }

    render() {
        let first = this.props.data[0];
        // meta
        let meta = this.props.meta;
        meta.left = +meta.left;
        meta.ticks = +meta.ticks;

        let [ color, hasLegend ] = this.makeColorScale(meta.color);
        let type = meta.bartype === 'point' ? { type: 'point', r: 8 } : meta.bartype;
        let direction = meta.direction;
        let orientation = meta.direction === 'vertical' ? 'left' : 'bottom';
        // let annotations = _.pluck(this.props.data, 'display');
        // console.log(annotations);
        // format
        let formStr = meta.format === 'dollar' ? '$,' : '.0%';
        let format = d3.format(formStr);
        let annotations = _.filter(this.props.data, (d) => d.label.length > 0);
        annotations.forEach((d) => {
            d.type = 'or';
        });

        // let annotations = _.map(this.props.data, (d) => {
        //     console.log(d);
        //     return {
        //         type: 'or',
        //         x: d.x, y: d.y, group: d.z, dx: 20, dy: -20,
        //         note: { label: d.label },
        //         className: 'annot'
        //     }
        // });
        this.props.data.forEach((d) => {
            d.class = d.label.length ? `${d.x}-${d.z}`.replace(' ', '-').toLowerCase() : 'no-label';
        });

        let axis = {
            orient: orientation,
            tickFormat: d => format(d),
            ticks: meta.ticks
        };

        let max = meta.max === 'fill' ? 1.0 : d3.max(this.props.data, d => d.y);

        let margin = this.props.style.margin;
        margin.left = meta.left;

        return (
            <div className="Chart">
                <div className="chart-title">
                    <h3>{this.props.titles.chartH1}</h3>
                    {/* <h4>{this.props.titles.chartH2}</h4> */}
                    <h5 className="fat-skinny">{this.props.titles.chartH3}</h5>
                </div>
                <ResponsiveORFrame
                    size={this.props.style.size}
                    responsiveWidth={true}
                    data={this.props.data}
                    type={type}
                    projection={direction}
                    oPadding={50}
                    oAccessor={'x'}
                    rAccessor={'y'}
                    rExtent={[0, max]}
                    style={ d => { return { fill: color(d.z) }} }

                    margin={margin}
                    oLabel={true}
                    axis={axis}
                    annotations={annotations}
                    // pieceHoverAnnotation={true}
                    hoverAnnotation={true}
                    // tooltipContent={ d => <p>{d.x}</p> }

                    // pieceClass={ d => d.class }
                />
                <Legend color={color} hasLegend={hasLegend} />

            </div>
        );
    }
}
