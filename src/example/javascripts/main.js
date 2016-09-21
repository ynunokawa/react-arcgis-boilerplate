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
//import document from 'global/document';

import List from './list/List';
//import {isReactDOMSupported} from '../lib/utils/react-utils';

const examples = (
  <main>
    <header>
      <div className="header-contents">
        <a className="header-logo" href="#">Hackathon Starter Kit</a>
        <nav>
          <li><a href="#map-components">Map</a></li>
          <li><a href="#ui-components">UI</a></li>
        </nav>
      </div>
    </header>
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
  </main>
);

// Cannot render to body anymore: react is throwing warnings.
// Adding new element instead.
const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;
document.body.appendChild(el);
render(examples, el);