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
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import document from 'global/document';

import List from './list/List';
import { isReactDOMSupported } from '../lib/utils/react-utils';

const examples = (
  <main>
  <a href="https://github.com/ynunokawa/react-arcgis-boilerplate"><img style={{position: 'absolute', top: 0, right: 0, border: 0, zIndex: 1}} src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></img></a>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React ArcGIS Boilerplate</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#map-components">Map</NavItem>
      <NavItem eventKey={2} href="#ui-components">UI</NavItem>
    </Nav>
  </Navbar>
  <Grid>
    <Row>
      <Col xs={12} md={12}>
        <article id="map-components">
          <h1>Esri Leaflet Map Components</h1>
          <section>
            <h3>FeatureLayer</h3>
            <p>Comming soon...</p>
          </section>
          <section>
            <h3>WebMap</h3>
            <p>Comming soon...</p>
          </section>
        </article>
        <article id="ui-components">
          <h1>UI Components</h1>
          <section>
            <h3>List</h3>
            <p>Access to ArcGIS Feature Service</p>
            <List />
          </section>
          <section>
            <h3>Comming soon...</h3>
            <p>Comming soon...</p>
          </section>
        </article>
      </Col>
    </Row>
  </Grid>
  </main>
);

// Cannot render to body anymore: react is throwing warnings.
// Adding new element instead.
const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;
document.body.appendChild(el);
render(examples, el);
