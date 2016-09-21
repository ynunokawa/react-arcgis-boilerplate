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
import {} from 'react-bootstrap';

import L from 'leaflet';
import {featureLayer} from 'esri-leaflet';

class FeatureLayer extends React.Component {
  constructor (props) {
      super(props);
      this.state = {

      };
  }

  componentDidMount () {
    const = featureLayer({
      url: this.props.url,
      where: this.props.where
    });
  }

  render () {
    return (

    );
  }
}

FeatureLayer.propTypes = {
  url: React.PropTypes.string,
  where: React.PropTypes.string
};

FeatureLayer.defaultProps = {
  url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0',
  where: "市区町村='練馬区'"
};

FeatureLayer.displayName = 'FeatureLayer';

export default FeatureLayer;