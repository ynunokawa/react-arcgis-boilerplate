// Copyright (c) 2016 Yusuke Nunokawa (https://ynunokawa.github.io)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import { Grid, Row, Col, Image, Button, Panel, Label, Glyphicon, utils } from 'react-bootstrap';
import { RadialChart } from 'react-vis';

class DonutChart extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        data: [],
        relationship: 0, // 0: none, 1: within, 2: contains, 3: intersects, 4: overlap, 5: nearby
        geometry: null, // for Spatial Query
        latlng: [], // for Spatial Query (only nearby)
        distance: null, // for Spatial Query (only nearby)
        where: '1=0',
        field: '',
        chartData: {}
      };
  }

  updateData (nextParams) {
    console.log('update!');
    let params = this.state;
    if (nextParams) {
      params = nextParams;
    }
    const query = L.esri.query({ url: this.props.serviceUrl });
    switch (String(params.relationship)){
    case '0':
        break;
    case '1':
        query.within(params.geometry);
        break;
    case '2':
        query.contains(params.geometry);
        break;
    case '3':
        query.intersects(params.geometry);
        break;
    case '4':
        query.overlap(params.geometry);
        break;
    case '5':
        query.nearby(params.latlng, params.distance);
        break;
    }
    query.where(params.where);
    query.run(function (error, featureCollection, response) {
      params.data = featureCollection.features;
      params.data.map(function (f) {
        if (!params.chartData[f.properties[params.field]]) {
          params.chartData[f.properties[params.field]] = 0;
        }
        params.chartData[f.properties[params.field]] += 1;
      });
      console.log(params.chartData);
      this.setState(params);
    }, this);
  }

  componentDidMount () {
    this.updateData();

    // Demo Script
    let demoParams = {
      data: [],
      relationship: 0, // 0: none, 1: within, 2: contains, 3: intersects, 4: overlap, 5: nearby
      geometry: null, // for Spatial Query
      latlng: null, // for Spatial Query (only nearby)
      distance: null, // for Spatial Query (only nearby)
      where: "市区町村='練馬区'",
      field: '種別',
      chartData: {}
    };
    this.updateData(demoParams);
  }

  render () {
    let chartData = [];
    let total = 0;
    for (let key in this.state.chartData) {
      console.log(this.state.chartData[key]);
      chartData.push({ angle: this.state.chartData[key] });
      total += this.state.chartData[key];
    }
    chartData.map(function (d) {
      d = d / total * 14;
    });
    const chart = (
        <RadialChart
        innerRadius={100}
        radius={140}
        data={chartData}
        width={300}
        height={300}/>
    );
    return (
        <Grid>
            <Row>
                {chart}
            </Row>
        </Grid>
    );
  }
}

DonutChart.propTypes = {
    serviceUrl: React.PropTypes.string
};

DonutChart.defaultProps = {
    serviceUrl: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0'
};

DonutChart.displayName = 'DonutChart';

export default DonutChart;
