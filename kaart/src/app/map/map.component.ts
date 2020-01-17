import {AfterViewInit, Component} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';

import WMTS from 'ol/source/WMTS';
import {BrtLayer} from "./layers/brtlayer";
import {KadastraleKaartLayer} from "./layers/kadastralekaartlayer";
import {BgtStandaardLayer} from "./layers/bgtstandaardlayer";
import Point from 'ol/geom/Point';
import {LocationExchance} from "../services/locationExchance";
import {toStringXY} from 'ol/coordinate';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  /* WMTS PDOK */
  public map: Map;

  private coordinate = [12744, 44317];
  private location: Point = new Point(this.coordinate);

  private readonly brtLayer: WMTS = null;
  private readonly kadastraleKaartLayer: WMTS = null;
  private readonly bgtStandaaardLayer: WMTS = null;

  constructor(private locationExchange: LocationExchance) {
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
    var mousePositionControl = this.createMouseTracker();

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: this.brtLayer,
          zIndex: 0
        }),
        new TileLayer({
          opacity: 1.0,
          source: this.kadastraleKaartLayer,
          zIndex: 1,
          visible: true
        }),
        new TileLayer({
          opacity: 1.0,
          source: this.bgtStandaaardLayer,
          zIndex: 2,
          visible: false
        })
      ],
      view: new View({
        center: [135000, 500000],
        zoom: 12
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [646.36, 308975.28, 276050.82, 636456.31]
        }),
        mousePositionControl
      ])
    });


    this.locationExchange.currentLocation.subscribe(point => {
      this.location = point;
      console.log('MapComponent - change location to: ' + toStringXY(point.getCoordinates()));
      const view: View = this.map.getView();
      var options = [{"maxZoom": 8, "minZoom": 10, "minResolution": 40}];
      view.fit(this.location, options);
    });
  }


  createMouseTracker(): MousePosition {
    var mousePosition: MousePosition = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      // className: 'custom-mouse-position',
      // target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'});
    return mousePosition;
  };

}
