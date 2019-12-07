import { Coordinates, Geometry } from '../model/geometry';
import { FilterIdentification } from '../model/filter/filter-identification';
import { SelectedFuncties } from '../model/selected-functies';
import { ResponseGeometryType } from '../model/response-geometry-type';
import { SpatialOperator } from '../model/spatial-operator';
import { ParameterZoekobject } from '../model/parameter-zoekobject';


class GeometrieOzon {
  type: ResponseGeometryType;
  coordinates: Coordinates;
}

export class GeoJsonZoekObject {
  geometrie: GeometrieOzon;
  spatialOperator: SpatialOperator;
}

export class ZoekParameters {
  parameter: ParameterZoekobject;
  zoekWaarden: string[];
}

export class PostBodyOzon {
  geo: GeoJsonZoekObject;
  zoekParameters?: ZoekParameters[];
}

export class GeoPostUtils {
  public static constructPostBody(geometry: Geometry, oldStyle?: boolean): any {
    if (!oldStyle) {
      return !geometry
        ? undefined
        : {
            _geo: {
              intersects: {
                type: GeoPostUtils.transformDescription(geometry.type),
                coordinates: geometry.coordinates,
              },
            },
          };
    } else {
      return !geometry
        ? undefined
        : {
            _geo: {
              intersects: {
                crs: {
                  type: 'name',
                  properties: {
                    name: 'urn:ogc:def:crs:EPSG::28992',
                  },
                },
                type: GeoPostUtils.transformDescription(geometry.type),
                coordinates: geometry.coordinates,
              },
            },
          };
    }
  }

  public static constructPostBodyWithFilters(
    geometry: Geometry,
    activiteiten: FilterIdentification[],
    normadressaten: FilterIdentification[],
    themas: FilterIdentification[],
    documenttypes: FilterIdentification[],
    documentIdentificatie: string,
  selectedFuncties: SelectedFuncties[],
    addZoekParameter: boolean
  ): PostBodyOzon {
    const postBodyOzon: PostBodyOzon = new PostBodyOzon();
    if (geometry) {
      postBodyOzon.geo = GeoPostUtils.constructGeoParameters(geometry, 'intersects');
    }

    if (addZoekParameter) {
      postBodyOzon.zoekParameters = [];
    }

    if (activiteiten && activiteiten.length > 0) {
      postBodyOzon.zoekParameters = [
        ...postBodyOzon.zoekParameters,
        ...GeoPostUtils.constructZoekParameters(activiteiten, 'activiteit.naam', 'activiteit.groep'),
      ];
    }
    if (themas && themas.length > 0) {
      postBodyOzon.zoekParameters = [
        ...postBodyOzon.zoekParameters,
        ...GeoPostUtils.constructZoekParameters(themas, 'thema', null),
      ];
    }

    if (selectedFuncties && selectedFuncties.length > 0) {
      postBodyOzon.zoekParameters = [
        ...postBodyOzon.zoekParameters,
        ...GeoPostUtils.constructZoekParametersSelectedFuncties(selectedFuncties),
      ];
    }
    if (documentIdentificatie) {
      const documentZoekParameter: ZoekParameters[] = [
        { parameter: 'documentIdentificatie', zoekWaarden: [documentIdentificatie] },
      ];
      postBodyOzon.zoekParameters = [...postBodyOzon.zoekParameters, ...documentZoekParameter];
    }
    return postBodyOzon;
  }

  private static constructZoekParametersSelectedFuncties(selectedFuncties: SelectedFuncties[]): ZoekParameters[] {
    const zoekParameters: ZoekParameters[] = [];
    const zoekParameterNaam: ZoekParameters = { parameter: 'functie.naam', zoekWaarden: [] };
    const zoekParameterGroep: ZoekParameters = { parameter: 'functie.groep', zoekWaarden: [] };
    selectedFuncties.forEach((selectedFunctie: SelectedFuncties) => {
      zoekParameterNaam.zoekWaarden.push(selectedFunctie.name);
      if (selectedFunctie.groep.waarde && !zoekParameterGroep.zoekWaarden.includes(selectedFunctie.groep.waarde)) {
        zoekParameterGroep.zoekWaarden.push(selectedFunctie.groep.waarde);
      }
    });
    zoekParameters.push(zoekParameterNaam);
    if (zoekParameterGroep.zoekWaarden.length > 0) {
      zoekParameters.push(zoekParameterGroep);
    }
    return zoekParameters;
  }

  private static constructGeoParameters(geometry: Geometry, setSpatialOperator: SpatialOperator): GeoJsonZoekObject {
    return {
      geometrie: {
        type: GeoPostUtils.transformDescription(geometry.type),
        coordinates: geometry.coordinates,
      },
      spatialOperator: setSpatialOperator,
    };
  }

  
  private static constructZoekParameters(
    filterIdentifications: FilterIdentification[],
    filterIdentificationNaam: ParameterZoekobject,
    filterIdentificationGroep?: ParameterZoekobject
  ): ZoekParameters[] {
    const zoekParameters: ZoekParameters[] = [];
    const zoekParameterNaam: ZoekParameters = { parameter: filterIdentificationNaam, zoekWaarden: [] };
    const zoekParameterGroep: ZoekParameters = { parameter: filterIdentificationGroep, zoekWaarden: [] };
    filterIdentifications.forEach((filterIdentification: FilterIdentification) => {
      zoekParameterNaam.zoekWaarden.push(filterIdentification.name);
      if (filterIdentificationGroep && !zoekParameterGroep.zoekWaarden.includes(filterIdentification.group)) {
        zoekParameterGroep.zoekWaarden.push(filterIdentification.group);
      }
    });
    zoekParameters.push(zoekParameterNaam);
    if (zoekParameterGroep.zoekWaarden.length > 0) {
      zoekParameters.push(zoekParameterGroep);
    }
    return zoekParameters;
  }


  public static transformDescription(typeGeometry: string): ResponseGeometryType {
    typeGeometry = typeGeometry.charAt(0).toUpperCase() + typeGeometry.substr(1).toLowerCase();
    switch (typeGeometry) {
      case 'Multipolygon':
        typeGeometry = 'MultiPolygon';
        break;
      case 'Linestring':
        typeGeometry = 'LineString';
        break;
      case 'Multipoint':
        typeGeometry = 'MultiPoint';
        break;
      case 'Multilinestring':
        typeGeometry = 'MultiLineString';
        break;
      case 'Geometrycollection':
        typeGeometry = 'GeometryCollection';
        break;
    }
    return typeGeometry as ResponseGeometryType;
  }
}
