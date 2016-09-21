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

class List extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        data: [],
        relationship: 0, // 0: none, 1: within, 2: contains, 3: intersects, 4: overlap, 5: nearby
        geometry: null, // for Spatial Query
        latlng: [], // for Spatial Query (only nearby)
        distance: null, // for Spatial Query (only nearby)
        where: '1=0'
      };
  }

  updateData (nextParams) {
    console.log('update!');
    let params = this.getQueryFromUrl();
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
    console.log('Found ' + featureCollection.features.length + ' features');
    const sortField = this.props.sortField
    params.data = featureCollection.features.sort(function (a, b) {
        return b.properties[sortField] - a.properties[sortField];
    });
    this.setState(params);
    }, this);
  }

  getQueryFromUrl () {
    let params = {
        data: [],
        relationship: 0,
        geometry: null,
        latlng: [],
        distance: null,
        where: '1=0'
    };
    const urlParams = location.hash.substring(1).split('&');
    urlParams.map(function (urlParam) {
        const param = urlParam.split('=');
        if(param[0] === 'relationship') {
            params.relationship = param[1];
        }
        if(param[0] === 'geometry') {
            params.geometry = param[1];
        }
        if(param[0] === 'lat') {
            params.latlng[0] = param[1];
        }
        if(param[0] === 'lng') {
            params.latlng[1] = param[1];
        }
        if(param[0] === 'distance') {
            params.distance = param[1];
        }
        if(param[0] === 'where') {
            params.where = decodeURIComponent(param[1]);
        }
    });
    return params;
  }

  showMap (e) {
      location.href = this.props.mapUrl + '?name=' + e.target.title;
  }

  showGoogle (e) {
      location.href = 'https://www.google.co.jp/#q=' + e.target.title;
  }

  componentDidMount () {
    this.updateData();
    window.onhashchange = function() {
        if (location.hash !== '') {
          this.updateData();
        }
    }.bind(this);

    // Demo Script
    let demoParams = {
      data: [],
      relationship: 5, // 0: none, 1: within, 2: contains, 3: intersects, 4: overlap, 5: nearby
      geometry: null, // for Spatial Query
      latlng: [35.73876392000045, 139.66248358600058], // for Spatial Query (only nearby)
      distance: 550, // for Spatial Query (only nearby)
      where: '1=1'
    };
    this.updateData(demoParams);
    let count = 0;
    setInterval(function () {
      count += 1;
      if (count === 3) {
        count = 0;
        demoParams.distance = 550;
      }
      demoParams.distance += count * 100;
      this.updateData(demoParams);
    }.bind(this), 5000);
  }

  render () {
    utils.bootstrapUtils.addStyle(Panel, 'custom');
    utils.bootstrapUtils.addStyle(Button, 'custom');

    const listItems = this.state.data.map(function (f) {
        const title = f.properties[this.props.headerField];
        const geometry = f.geometry.coordinates;
        const typeLabel = f.properties[this.props.typeLabelField];
        const info = f.properties[this.props.mainInfoField];

        const otherLabel = this.props.otherLabelFields.map(function (field, i) {
            const label = f.properties[field];
            const key = field + i;
            return (
                <Label key={key}>{label}</Label>
            );
        });

        const subcontents = this.props.infoFields.map(function (infoField, i) {
            const info = f.properties[infoField];
            const key = infoField + i;
            return (
                <p key={key} className="list-panel-subcontents">{infoField}: {info}</p>
            );
        });

        const contentsLayout = (
            <Row>
                <style type="text/css">{`
                    .list-panel-thumbnail {
                        width: 100%;
                        margin-bottom: 10px;
                        border: 1px solid #ddd;
                    }
                    .list-panel-subcontents {
                        font-size: .8em;
                    }
                `}</style>
                <Col xs={6} md={6}>
                    <Label bsStyle="info">{typeLabel}</Label>&nbsp;
                    {otherLabel}
                    <h3>{this.props.mainInfoField}: {info}</h3>
                    {subcontents}
                </Col>
                <Col xs={6} md={6}>
                    <Image src="https://react-bootstrap.github.io/assets/thumbnail.png" className="list-panel-thumbnail" thumbnail />
                </Col>
            </Row>
        );

        return (
            <Col xs={12} sm={6} md={4} key={title}>
                <style type="text/css">{`
                .panel-custom {
                    border-color: #f5646a;
                }
                .panel-custom > .panel-heading {
                    background-color: #f5646a;
                    color: #fff;
                    border-color: #f5646a;
                    font-weight: bold;
                }
                .btn-custom {
                    color: #fff;
                    background-color: #f58264;
                    border-color: #f58264;
                }
                `}</style>
                <Panel header={title} bsStyle="custom">
                    {contentsLayout}
                    <style type="text/css">{`
                    .list-panel-footer {
                        text-align: right;
                    }
                    `}</style>
                    <Row>
                        <Col xs={12} md={12} className="list-panel-footer">
                            <Button title={title} onClick={this.showMap} bsStyle="custom">マップ <Glyphicon glyph="map-marker" /></Button>&nbsp;
                            <Button title={title} onClick={this.showGoogle}>Google 検索</Button>
                        </Col>
                    </Row>
                </Panel>
            </Col>
        );
    }, this);

    return (
        <Grid>
            <Row>
                {listItems}
            </Row>
        </Grid>
    );
  }
}

List.propTypes = {
    serviceUrl: React.PropTypes.string, // https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0
    headerField: React.PropTypes.string, // '施設名'
    typeLabelField: React.PropTypes.string, // '種別'
    otherLabelFields: React.PropTypes.array, // ['対象年齢', '運営主体']
    mainInfoField: React.PropTypes.string, // ['定員']
    infoFields: React.PropTypes.array, // ['郵便番号', '住所']
    sortField: React.PropTypes.string, // ['定員']
    mapUrl: React.PropTypes.string
};

List.defaultProps = {
    serviceUrl: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0',
    headerField: '施設名',
    typeLabelField: '種別',
    otherLabelFields: ['対象年齢', '運営主体'],
    mainInfoField: '定員',
    infoFields: ['郵便番号', '住所'],
    sortField: '定員',
    mapUrl: 'https://bl.ocks.org/ynunokawa/raw/43ab2f03c4d2f29e3d5ebd3dadb1932d/'
};

List.displayName = 'List';

export default List;
