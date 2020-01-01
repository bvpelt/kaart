import {AfterViewInit, Component} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OlTileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import {Projection} from 'ol/proj';
import {getWidth, getTopLeft} from 'ol/extent';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  /* WMTS PDOK */
  //static projection = 'EPSG:28992';

  static map: Map;
  static projectionExtent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
  static projection: Projection = new Projection({code: 'EPSG:28992', units: 'm', extent: MapComponent.projectionExtent});

  static size = getWidth(MapComponent.projectionExtent) / 256;

  static wmtsSource: WMTS = null;
  static resolutions: any;
  static matrixIds: any;

  constructor () {
    MapComponent.resolutions = new Array(14);
    MapComponent.matrixIds = new Array(14);
    for (let z = 0; z < 14; ++z) {
      MapComponent.resolutions[z] = MapComponent.size / Math.pow(2, z);
      MapComponent.matrixIds[z] = z; //'EPSG:28992:' + z;
      // console.log("z: " + z + " resolution: " + this.resolutions[z] + " matrixIds: " + this.matrixIds[z])
    }
  }

  ngAfterViewInit() {

    MapComponent.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: this.createWmts()
        })
      ],
      view: new View({
        center: [142892.19, 470783.87],
        zoom: 4
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: MapComponent.projectionExtent
        })
      ])
    });
  }

  private createWmts(): WMTS {

    MapComponent.wmtsSource = new WMTS({
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      layer: "bgtachtergrond",
      matrixSet: 'EPSG:28992', //this.projection,
      format: 'image/png',
      projection: MapComponent.projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(MapComponent.projectionExtent),
        resolutions: MapComponent.resolutions,
        matrixIds: MapComponent.matrixIds,
      }),
      style: 'default',
      wrapX: true,
      crossOrigin: 'anonymous'
    });

    return MapComponent.wmtsSource;
  }

}
