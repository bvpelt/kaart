import WMTS from 'ol/source/WMTS';
import {getTopLeft} from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {LayerUtils} from "./layerutils";

export class BgtStandaardLayer {

  public static createBgtStandaardLayer(): WMTS {
    const layerUtils: LayerUtils = new LayerUtils();
    const layerName: string = 'bgtstandaard';

    const bgtStandaardLayer: WMTS = new WMTS({
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      crossOrigin: 'anonymous',
      projection: layerUtils.getProjection(),
      layer: layerName,
      format: 'image/png',
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(layerUtils.getProjectionExtent()),
        resolutions: layerUtils.getResultions(),
        matrixIds: layerUtils.getMatrixIds(),
      }),
      style: 'default',
      matrixSet: layerUtils.getProjection(),
      wrapX: true,
    });

    return bgtStandaardLayer;
  }
}
