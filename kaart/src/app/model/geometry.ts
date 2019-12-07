export class Geometry {
    projection?: {
      dataProjection: string;
      featureProjection: string;
    };
  
    constructor(public coordinates: Coordinates, public type: GeometryType) {}
  }
  
  export type GeometryType = 'POINT' | 'POLYGON' | 'MULTIPOLYGON' | 'LINESTRING' | 'MULTIPOINT' | 'MULTILINESTRING';
  
  export type Coordinates = number[] | number[][] | number[][][] | number[][][][];
  