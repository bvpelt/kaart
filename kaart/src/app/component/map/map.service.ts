import { Injectable } from '@angular/core';
import OlMap from 'ol/Map';
import { Projection } from 'ol/proj';
import OlView from 'ol/View';
import OlPinchZoom from 'ol/interaction/PinchZoom';
import OlMouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import OlKeyboardZoom from 'ol/interaction/KeyboardZoom';
import OlDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import { defaults } from 'ol/interaction';

@Injectable()
export class MapService {
  public static DEFAULT_MAP = '_DEFAULT_';
  public static center: [number, number] = [156527, 456220];
  public static defaultMap = {
    center: MapService.center,
    zoom: 2,
  };
  public static nlxtent: any = [9632, 306708, 278200, 622130];
  private maps: Map<string, OlMap> = new Map();

  constructor() {}

  static get defaultView(): OlView {
    return new OlView({
      projection: new Projection({
        code: 'EPSG:28992',
        units: 'm',
        extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999],
        getPointResolution: function(resolution) {
          return resolution;
        },
      }),
      minResolution: 0.05,
      maxResolution: 1000,
    });
  }

  private static createNewMap() {
    const map = new OlMap({
      view: MapService.defaultView,
      interactions: defaults({
        pinchRotate: false,
      }).extend([
        new OlPinchZoom({
          constrainResolution: true,
        }),
        new OlMouseWheelZoom({ duration: 1000 }),
        new OlKeyboardZoom({ duration: 1000 }),
      ]),
    });
    map.getView().setMaxZoom(14);
    map.getView().setMinZoom(2);
    let dblClickInteraction = new OlDoubleClickZoom();
    map
      .getInteractions()
      .getArray()
      .forEach(interaction => {
        if (interaction instanceof OlDoubleClickZoom) {
          dblClickInteraction = interaction;
        }
      });
    map.removeInteraction(dblClickInteraction);
    map.getView().fit(MapService.nlxtent, { constrainResolution: false });
    return map;
  }

  getMap(mapIndex?: string): OlMap {
    if (mapIndex == null) {
      mapIndex = MapService.DEFAULT_MAP;
    }
    if (!this.maps.has(mapIndex)) {
      const map = MapService.createNewMap();
      this.setExtentToNL(map);
      this.maps.set(mapIndex, map);
    }
    return this.maps.get(mapIndex);
  }

  setExtentToNL(map) {
    // timeout toegevoegd om probleem in het portaal te voorkomen waardoor de kaart soms niet getoond werd.

    setTimeout(() => {
      map.getView().fit(MapService.nlxtent, { constrainResolution: false });
    }, 100);
  }
}
