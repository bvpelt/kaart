import {AfterViewInit, Component} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import {BrtLayer} from "./layers/brtlayer";
import {KadastraleKaartLayer} from "./layers/kadastralekaartlayer";
import {BgtStandaardLayer} from "./layers/bgtstandaardlayer";
import Point from 'ol/geom/Point';
import {LocationExchance} from "../services/locationExchance";
import {createStringXY, toStringXY} from 'ol/coordinate';
import MousePosition from 'ol/control/MousePosition';
import Projection from 'ol/proj/Projection';
import {LayerUtils} from "./layers/layerutils";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  /* WMTS PDOK */
  public map: Map;
  private layerUtils: LayerUtils = new LayerUtils();

  private coordinate = [166546.5, 446639.31]; //[5.55537293, 52.00800145];
  private location: Point = new Point(this.coordinate);

  constructor(private locationExchange: LocationExchance) {

  }

  ngAfterViewInit() {
    const mousePositionControl = this.createMouseTracker();
    const projection: Projection = new Projection({
      code: this.layerUtils.getProjection(),
      units: this.layerUtils.getUnits(),
      extent: this.layerUtils.getProjectionExtent(),
      getPointResolution: function (resolution) {
        return resolution;
      },
    });

    const brtLayer: BrtLayer = BrtLayer.createBrtLayer();
    const kadastraleKaartLayer: KadastraleKaartLayer = KadastraleKaartLayer.createKadastraleKaartLayer();
    const bgtStandaaardLayer: BgtStandaardLayer = BgtStandaardLayer.createBgtStandaardLayer();

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: brtLayer,
          zIndex: 0
        }),
        new TileLayer({
          opacity: 1.0,
          source: kadastraleKaartLayer,
          zIndex: 1,
          visible: false
        }),
        new TileLayer({
          opacity: 1.0,
          source: bgtStandaaardLayer,
          zIndex: 2,
          visible: false
        })
      ],
      view: new View({
        projection: projection,
        minResolution: 0.05,
        maxResolution: 1000
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: this.layerUtils.getProjectionExtent()
        }),
        mousePositionControl
      ])
    });

    this.map.getView().setMaxZoom(14);
    this.map.getView().setMinZoom(2);
    this.map.getView().fit(this.layerUtils.getNlExtend(), {constrainResolution: false});

    this.locationExchange.currentLocation.subscribe(point => {
      this.location = point;
      const view: View = this.map.getView();
      const options = [{padding: [50, 50, 50, 50]}];

      console.log('MapComponent - change location to: ' + toStringXY(point.getCoordinates(), 6), 4);
      console.log("Current zoom: " + view.getZoom());

      view.fit(point, options);
      view.setZoom(11);

      console.log("Next zoom: " + view.getZoom());
    });

  }

  setExtentToNL(map: Map) {
    // timeout toegevoegd om probleem in het portaal te voorkomen waardoor de kaart soms niet getoond werd.

    //setTimeout(() => {
    map.getView().fit(this.layerUtils.getNlExtend(), {constrainResolution: false});
    //}, 100);
  }

  createMouseTracker(): MousePosition {
    var mousePosition: MousePosition = new MousePosition({
      coordinateFormat: createStringXY(4), // 4 digits
      projection: this.layerUtils.getProjection(), // 'EPSG:28992',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      // className: 'custom-mouse-position',
      // target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });
    return mousePosition;
  };

}
