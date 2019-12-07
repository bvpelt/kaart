import { inject, TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService],
    });
  });

  it('should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));

  it('expect the same map when requesting the map twice.', inject([MapService], (service: MapService) => {
    expect(service.getMap()).toEqual(service.getMap());
    expect(service.getMap('myMap')).toEqual(service.getMap('myMap'));
    expect(service.getMap()).not.toEqual(service.getMap('myMap'));
  }));
});
