import WMTS from 'ol/source/WMTS';
import {getTopLeft} from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {LayerUtils} from "./layerutils";

export class BrtLayer {

  public static createBrtLayer(): WMTS {
    const layerUtils: LayerUtils = new LayerUtils();
    const layerName: string = 'brtachtergrondkaart';

    const brtLayer: WMTS = new WMTS({
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      layer: layerName,
      matrixSet: layerUtils.getProjection(),
      format: 'image/png',
      projection: layerUtils.getProjection(),
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(layerUtils.getProjectionExtent()),
        resolutions: layerUtils.getResultions(),
        matrixIds: layerUtils.getMatrixIds(),
      }),
      style: 'default',
      wrapX: true,
      crossOrigin: 'anonymous'
    });

    return brtLayer;
  }
}
