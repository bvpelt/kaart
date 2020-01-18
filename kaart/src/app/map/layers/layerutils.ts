export class LayerUtils {
  private rdprojection: string = 'EPSG:28992';
  private units: string = 'm';
  private projectionExtent: number[] = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
  private nlxtent: number[] = [9632, 306708, 278200, 622130];
  private center: number[] = [156527, 456220];
  private resolutions = [
    3440.64,
    1720.32,
    860.16,
    430.08,
    215.04,
    107.52,
    53.76,
    26.88,
    13.44,
    6.72,
    3.36,
    1.68,
    0.84,
    0.42,
  ];
  private matrixIds: string[] = new Array(14);

  constructor() {

    for (let z = 0; z < 14; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      this.matrixIds[z] = this.rdprojection + ':' + z;
    }
  }

  getNlExtend(): number[] {
    return this.nlxtent;
  }

  getUnits(): string {
    return this.units;
  }

  getCenter(): number[] {
    return this.center;
  }

  getProjection(): string {
    return this.rdprojection;
  }

  getProjectionExtent(): any {
    return this.projectionExtent;
  }

  getResultions(): number[] {
    return this.resolutions;
  }

  getMatrixIds(): string[] {
    return this.matrixIds;
  }
}
