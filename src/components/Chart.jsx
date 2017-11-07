import React from 'react';
import * as d3 from 'd3';
import * as _ from 'underscore';
import { ORFrame } from 'semiotic';
import Legend from './Legend';
import '../styles/Chart.css';

let margin = { left: 80, top: 30, bottom: 40, right: 60 };

export default class Chart extends React.Component {
    render() {
        // meta
		let meta = this.props.meta;
		let data = this.props.data;
        console.log(meta);
        console.log(data);
        let color = this.props.color;

        let formStr = meta.format === 'dollar' ? '$.2s' : '.0%';
        let format = d3.format(formStr);
        // let direction = meta.projection === 'vertical' ? 'left' : 'bottom';

        let axis = {
            // orient: direction,
            tickFormat: d => format(d),
			ticks: meta.ticks || 5
        };

        let max = meta.fill ? '1.0' : d3.max(data, d => d.y);
        let type = meta.bartype !== 'pie' ? meta.bartype : { type: 'bar', innerRadius: 50 };
        let colorExtent = _.chain(data)
            .pluck('color')
            .uniq()
            .value();

        margin.left = meta.left;

        let isPie = meta.bartype === 'pie';
        let size = !isPie ? this.props.size : [this.props.size[1], this.props.size[1]];
        let dynamic = isPie ? 'y' : null;

        return (
            <div className="Chart">
                <div className="chart-title">
                    <h3>{this.props.text.titles.chartH1}</h3>
                    <h5 className="fat-skinny">{this.props.text.titles.chartH3}</h5>
                </div>
                <ORFrame
                    size={size}
                    data={data}
                    type={type}
                    projection={meta.projection}
                    oPadding={!isPie ? 20 : 0}
                    oAccessor={'x'}
                    rAccessor={!isPie ? 'y' : null}
                    rExtent={[0, max]}
                    style={ d => { return { fill: color(d.z) }} }
                    dynamicColumnWidth={dynamic}

                    margin={margin}
                    oLabel={true}
                    axis={!isPie ? axis : null}

                />
                <Legend color={color} hasLegend={meta.hasLegend} extent={colorExtent} />
            </div>
        );
    }
}
