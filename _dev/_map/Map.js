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
import {} from 'esri-leaflet';

class Map extends React.Component {
  constructor (props) {
      super(props);
      this.state = {

      };
  }

  componentDidMount () {
    const map = L.map(this.props.divid, {
      center: this.props.center,
      zoom: this.props.zoom
    });
  }

  render () {
    return (

    );
  }
}

Map.propTypes = {
  divid: React.PropTypes.string,
  center: React.PropTypes.array,
  zoom: React.PropTypes.number
};

Map.defaultProps = {
  divid: 'map',
  center: [39, 135],
  zoom: 6
};

Map.displayName = 'Map';

export default WebMap;