import WMTS from 'ol/source/WMTS';
import {getTopLeft} from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {LayerUtils} from "./layerutils";

export class KadastraleKaartLayer {

  public static createKadastraleKaartLayer(): WMTS {
    const layerUtils: LayerUtils = new LayerUtils();
    const layerName: string = 'kadastralekaartv3';

    const kadastraleKaartLayer: WMTS = new WMTS({
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      layer: layerName,
      active: false,
      crossOrigin: 'anonymous',
      matrixSet: layerUtils.getProjection(),
      format: 'image/png',
      projection: layerUtils.getProjection(),
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(layerUtils.getProjectionExtent()),
        resolutions: layerUtils.getResultions(),
        matrixIds: layerUtils.getMatrixIds(),
      }),
      style: 'default',
      wrapX: true
    });

    return kadastraleKaartLayer;
  }
}
