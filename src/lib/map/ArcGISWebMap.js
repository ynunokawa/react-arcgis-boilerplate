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
import { Grid, Row } from 'react-bootstrap';

class ArcGISWebMap extends React.Component {
  constructor (props) {
      super(props);
      this.state = {};
  }

  componentDidMount () {
    const map = L.map('react-arcgis-boilerplate-map');
    const webmap = L.esri.webMap(this.props.mapid, { map: map });
  }

  render () {
    return (
        <Grid>
            <Row>
                <style type="text/css">{`
                    #react-arcgis-boilerplate-map {
                        position: relative;
                        height: 300px;
                        width: 100%;
                    }
                `}</style>
                <div id='react-arcgis-boilerplate-map'></div>
            </Row>
        </Grid>
    );
  }
}

ArcGISWebMap.propTypes = {
  mapid: React.PropTypes.string
};

ArcGISWebMap.defaultProps = {
  mapid: '55e02e777274468c90745fde6641faf4'
};

ArcGISWebMap.displayName = 'ArcGISWebMap';

export default ArcGISWebMap;
