import WMTS from 'ol/source/WMTS';
import {getTopLeft, getWidth} from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

export class BgtStandaardLayer {

  public static createBgtStandaardLayer(): WMTS {
    const resolutions: Array<number> = new Array(14);
    const matrixIds: Array<string> = new Array(14);

    const projectionExtent = [646.36, 308975.28, 276050.82, 636456.31];
    const size = getWidth(projectionExtent) / 256;

    for (let z = 0; z < 14; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = 'EPSG:28992:' + z;
    }

    const bgtStandaardLayer: WMTS = new WMTS({
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      layer: 'bgtstandaard',
      matrixSet: 'EPSG:28992',
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

    return bgtStandaardLayer;
  }
}
