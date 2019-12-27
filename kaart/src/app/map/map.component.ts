import {AfterViewInit, Component} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import {get as getProjection} from 'ol/proj';
import {getWidth, getTopLeft} from 'ol/extent';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map: Map;
  private projection = getProjection('EPSG:3857');
  private projectionExtent = this.projection.getExtent();
  private size = getWidth(this.projectionExtent) / 256;
  private resolutions = new Array(14);
  private matrixIds = new Array(14);

  constructor() {

    for (let z = 0; z < 14; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      this.resolutions[z] = this.size / Math.pow(2, z);
      this.matrixIds[z] = z;
    }
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          /*
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })

           */
          source: new WMTS({
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
              'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
            url: 'https://services.arcgisonline.com/arcgis/rest/' +
              'services/Demographics/USA_Population_Density/MapServer/WMTS/',
            layer: '0',
            matrixSet: 'EPSG:3857',
            format: 'image/png',
            projection: this.projection,
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(this.projectionExtent),
              resolutions: this.resolutions,
              matrixIds: this.matrixIds
            }),
            style: 'default',
            wrapX: true
          })
        })
      ],
      /*
      view: new View({
        center: [813079.7791264898, 5929220.284081122],
        zoom: 7
      }),

       */
      view: new View({
        center: [-11158582, 4813697],
        zoom: 4
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });
  }

}
