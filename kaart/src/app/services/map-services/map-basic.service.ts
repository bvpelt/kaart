import { Injectable } from '@angular/core';
import OlMap from 'ol/Map';
import OlStyle from 'ol/style/Style';
import OlStroke from 'ol/style/Stroke';
import OlWKT from 'ol/format/WKT';
import OlGeoJSON from 'ol/format/GeoJSON';
import OlFeature from 'ol/Feature';
import { Extent } from 'ol/extent';
import { Geometry } from '../../model/geometry';
import { MapService } from '../map.service';
import { GeoPostUtils } from '../../utils/geo-posts.utils'

@Injectable({
  providedIn: 'root'
})
export class MapBasicService {


  private map: OlMap;
  private styleBigPlanContour = new OlStyle({
    // Chrome/Openlayers performance fix
    stroke: new OlStroke({
      color: 'black',
      width: 2,
    }),
  });

  constructor(private mapService: MapService) {
    this.map = mapService.getMap();
  }

  public static wktToGeoJsonString(geometry: any): Geometry {
    const wktFormat = new OlWKT();
    const layer = wktFormat.readGeometry(geometry);
    const geojsonFormat = new OlGeoJSON();
    return JSON.parse(geojsonFormat.writeGeometry(layer));
  }

  public static transform(geojson: Geometry): string {
    const format = new OlGeoJSON();
    const geometry = format.readGeometry(
      {
        type: MapBasicService.transformDescription(geojson.type),
        coordinates: geojson.coordinates,
      },
      geojson.projection
    );
    const feature = new OlFeature(geometry);

    return format.writeFeature(feature);
  }

  public static transformDescription(typeGeometry: string): string {
    return GeoPostUtils.transformDescription(typeGeometry);
  }

  public getMap(): OlMap {
    return this.map;
  }

  public refreshMap() {
    setTimeout(() => {
      this.map.updateSize();
    }, 100);
  }

  replaceStyleBigPlanContour(extent: Extent, _style: OlStyle | OlStyle[]): OlStyle | OlStyle[] {
    const style = null;
    if (extent[2] - extent[0] > 50000 && extent[3] - extent[1] > 40000 && extent[0] !== -37000000) {
      this.styleBigPlanContour = this.setFillToInputFill(_style);
    }
    return style;
  }

  setFillToInputFill(_style: OlStyle | OlStyle[]) {
    const style = this.styleBigPlanContour;
    if (_style[0] != null) {
      (_style as OlStyle[]).forEach(_style => style.setFill(_style.getFill()));
    } else {
      style.setFill((_style as OlStyle).getFill());
    }
    return style;
  }
}
