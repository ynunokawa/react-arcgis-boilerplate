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
import { Grid, Row, Col, ListGroup, ListGroupItem, Badge, utils } from 'react-bootstrap';

class ListGroups extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        data: [],
        listGroupsData: {},
        types: [],
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
    const typeField = this.props.typeField;
    const nameField = this.props.nameField;
    const labelField = this.props.labelField;
    const sortField = this.props.sortField;
    params.data = featureCollection.features;
    params.data.map(function (f) {
      if (!(f.properties[typeField] in params.listGroupsData)) {
        params.listGroupsData[f.properties[typeField]] = [];
      }
      params.listGroupsData[f.properties[typeField]].push({ name: f.properties[nameField], label: f.properties[labelField]});
    });
    params.data = featureCollection.features.sort(function (a, b) {
        return b.properties[sortField] - a.properties[sortField];
    });
    this.setState(params);
    }, this);
  }

  getQueryFromUrl () {
    let params = {
        data: [],
        listGroupsData: {},
        types: [],
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

  componentDidMount () {
    this.updateData();

    // Demo Script
    let demoParams = {
      data: [],
      listGroupsData: {},
      types: ['認可保育所', '認証保育所（A型）', '認証保育所（B型）'],
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
    utils.bootstrapUtils.addStyle(ListGroupItem, 'custom');
    utils.bootstrapUtils.addStyle(Badge, 'custom');

    const listGroupsData = this.state.listGroupsData;

    const listGroups = Object.keys(listGroupsData).map(function (k) {
      console.log(k);
      const listGroupItems = listGroupsData[k].map(function (d, i) {
        if (i === 0) {
          return (
            <main>
            <style type="text/css">{`
            .list-group-item-custom {
                background-color: #f5646a;
                color: #fff !important;
                border-color: #f5646a;
                font-weight: bold;
            }
            .list-group-item-custom:hover {
                background-color: #f5646a !important;
                opacity: 0.8;
            }
            .badge {
                background-color: #fff;
                color: #f5646a;
            }
            `}</style>
            <ListGroupItem href="#" bsStyle="custom">
              {k}
              <Badge>{d.label}</Badge>
            </ListGroupItem>
            <ListGroupItem href="#">{d.name}</ListGroupItem>
            </main>
          );
        } else {
          return (
            <ListGroupItem href="#">{d.name}</ListGroupItem>
          );
        }
      });
      return (
        <Col xs={12} sm={6} md={4}>
          <ListGroup>
            {listGroupItems}
          </ListGroup>
        </Col>
      );
    });
    console.log(listGroups);

    return (
        <Grid>
          <Row>
            {listGroups}
          </Row>
        </Grid>
    );
  }
}

ListGroups.propTypes = {
    serviceUrl: React.PropTypes.string,
    typeField: React.PropTypes.string,
    nameField: React.PropTypes.string,
    labelField: React.PropTypes.string,
    sortField: React.PropTypes.string
};

ListGroups.defaultProps = {
    serviceUrl: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0',
    typeField: '種別',
    nameField: '施設名',
    labelField: '定員',
    sortField: '定員'
};

ListGroups.displayName = 'ListGroups';

export default ListGroups;
