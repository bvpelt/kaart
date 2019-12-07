import { TestBed } from '@angular/core/testing';

import { MapBasicService } from './map-basic.service';

describe('MapBasicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapBasicService = TestBed.get(MapBasicService);
    expect(service).toBeTruthy();
  });
});
