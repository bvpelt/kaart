import {AfterViewInit, Component} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';

import WMTS from 'ol/source/WMTS';
import {BrtLayer} from "./brtlayer";
import {KadastraleKaartLayer} from "./kadastralekaartlayer";
import {BgtStandaardLayer} from "./bgtstandaardlayer";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  /* WMTS PDOK */
  static map: Map;

  private brtLayer: WMTS = null;
  private kadastraleKaartLayer: WMTS = null;
  private bgtStandaaardLayer: WMTS = null;

  constructor() {
    if (this.brtLayer === null) {
      this.brtLayer = BrtLayer.createBrtLayer();
    }
    if (this.kadastraleKaartLayer === null) {
      this.kadastraleKaartLayer = KadastraleKaartLayer.createKadastraleKaartLayer();
    }
    if (this.bgtStandaaardLayer === null) {
      this.bgtStandaaardLayer = BgtStandaardLayer.createBgtStandaardLayer();
    }
  }

  ngAfterViewInit() {
    MapComponent.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: this.brtLayer
        }),
        new TileLayer({
          opacity: 1.0,
          source: this.kadastraleKaartLayer
        }),
        new TileLayer({
          opacity: 1.0,
          source: this.bgtStandaaardLayer,
          visual: false
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
