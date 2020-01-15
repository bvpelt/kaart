import { TestBed } from '@angular/core/testing';

import { PdoklocService } from './pdokloc.service';

describe('PdoklocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdoklocService = TestBed.get(PdoklocService);
    expect(service).toBeTruthy();
  });
});
