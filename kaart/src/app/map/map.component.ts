import {AfterViewInit, Component} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
/* import {Projection} from 'ol/proj'; */
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  /* WMTS PDOK */
  static map: Map;

  private wmtsSource: WMTS = null;

  constructor() {
    if (this.wmtsSource === null) {
      this.wmtsSource = MapComponent.createWmts();
    }
  }

  private static createWmts(): WMTS {
    const resolutions: Array<number> = new Array(14);
    const matrixIds: Array<string> = new Array(14);
    const projectionExtentxx = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];

    const projectionExtent = [646.36, 308975.28, 276050.82, 636456.31];
    const size = getWidth(projectionExtent) / 256;
    const projection = getProjection('EPSG:28992');

    console.log('projection: ' + projection);
    console.log('size: ' + size);
    console.log('projectionExtent: ' + projectionExtent);

    for (let z = 0; z < 14; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = 'EPSG:28992:' + z; /* z */
      console.log('z: ' + z + ' resolution: ' + resolutions[z] + ' matrixIds: ' + matrixIds[z]);
    }

    const wmtsSource: WMTS = new WMTS({
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      layer: 'brtachtergrondkaart',
      matrixSet: 'EPSG:28992', /* this.projection, */
      format: 'image/png',
      projection: 'EPSG:28992',
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions,
        matrixIds,
      }),
      style: 'default',
      wrapX: true,
      crossOrigin: 'anonymous'
    });

    return wmtsSource;
  }

  ngAfterViewInit() {
    MapComponent.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: this.wmtsSource
        })
      ],
      view: new View({
        center: [135000, 500000],
        zoom: 12
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [646.36, 308975.28, 276050.82, 636456.31]
        })
      ])
    });
  }

}
