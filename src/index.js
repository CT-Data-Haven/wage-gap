import React from 'react';
import ReactDOM from 'react-dom';
import { queue, csv, nest, json } from 'd3';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const style = {
    // size: [600, 400],
    height: 320,
    margin: { left: 10, top: 15, bottom: 30, right: 15 },
    colorBySex: {
        colors: [ '#2555a8', '#d83a7c' ],
        labels: [ 'Men', 'Women' ],
        hasLegend: true
    },
    colorByLoc: {
        colors: [ '#495B7A', '#25A89D' ],
        labels: [ 'US', 'Connecticut' ],
        hasLegend: false
    },
    colorByType: {
        colors: [ '#25a89d', '#78d7a3' ],
        labels: [ 'Full-time', 'Part-time' ],
        hasLegend: true
    }
};


queue()
    .defer(csv, './data/wage_gap_data.csv')
    .defer(csv, './data/wage_gap_meta.csv')
    .defer(json, './data/wage_gap_text.json')
    .await(function(error, data, meta, json) {
        if (error) throw error;

        data.forEach((d) => {
            d.y = +d.y;
        });

        let split = nest()
            .key((d) => d.step)
            .entries(data);

        let app = <App data={split} style={style} json={json} meta={meta} />;
        ReactDOM.render(app, document.getElementById('root'));
    });

// ReactDOM.render(<App data={split} style={style} />, document.getElementById('root'));

registerServiceWorker();
