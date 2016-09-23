# React ArcGIS Boilerplate

IN PROGRESS..

## Usage

```
npm i react-arcgis-boilerplate
```

```js
import { ArcGISWebMap, DonutChart, ItemList } from 'react-arcgis-boilerplate';
```
### Mapping

mostly use [Leaflet](http://leafletjs.com/) and [Esri Leaflet](http://esri.github.io/esri-leaflet/) as the basis for mapping components.

#### [`<ArcGISWebMap />`](https://bl.ocks.org/ynunokawa/raw/43ab2f03c4d2f29e3d5ebd3dadb1932d/)

built with [`ynunokawa/L.esri.WebMap`](https://github.com/uber/react-vis).

```xml
<ArcGIS mapid={"55e02e777274468c90745fde6641faf4"} />
```

### Visualization

mostly use [D3](https://d3js.org/) and [Uber react-vis](https://github.com/uber/react-vis) as the basis for visualization components.

#### [`<DonutChart />`](https://github.com/ynunokawa/react-arcgis-boilerplate/blob/master/src/lib/viz/DonutChart.js)

```xml
<DonutChart
  serviceUrl={"https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0"}
  field={"市区町村='練馬区'"}
  where={"種別"}
/>
```

### UI

mostly use [React Bootstrap](https://react-bootstrap.github.io/) as the basis for UI components.

#### [`<ListGroups />`](https://github.com/ynunokawa/react-arcgis-boilerplate/blob/master/src/lib/ui/list/ItemList.js)

```xml
<ListGroups
  serviceUrl={"https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0"}
  typeField={"種別"}
  nameField={"施設名"}
  labelField={"定員"}
  sortField={"定員"}
/>
```

#### [`<ItemList />`](https://github.com/ynunokawa/react-arcgis-boilerplate/blob/master/src/lib/ui/list/ItemList.js)

```xml
<ItemList
  serviceUrl={"https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/%E4%BF%9D%E8%82%B2%E5%9C%9223%E5%8C%BA/FeatureServer/0"}
  headerField={"施設名"}
  typeLabelField={"種別"}
  otherLabelFields={["対象年齢", "運営主体"]}
  mainInfoField={"定員"}
  infoFields={["郵便番号", "住所"]}
  sortField={"定員"}
/>
```
