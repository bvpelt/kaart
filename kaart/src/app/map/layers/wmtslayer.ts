import WMTS from 'ol/source/WMTS';
import {BrtLayer} from "./brtlayer";
import {KadastraleKaartLayer} from "./kadastralekaartlayer";
import {BgtStandaardLayer} from "./bgtstandaardlayer";

export class WMTSLayer {
  static layers: Array<WMTS>;

  constructor() {
    if (WMTSLayer.layers === null) {
      WMTSLayer.layers = new Array(3);

      WMTSLayer.layers[0] = BrtLayer.createBrtLayer();
      WMTSLayer.layers[1] = KadastraleKaartLayer.createKadastraleKaartLayer();
      WMTSLayer.layers[2] = BgtStandaardLayer.createBgtStandaardLayer();
    }
  }

  getWMTSLayers () : Array<WMTS> {
    return WMTSLayer.layers;
  }
}
