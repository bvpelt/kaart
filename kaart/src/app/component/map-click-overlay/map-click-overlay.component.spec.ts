import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapClickOverlayComponent } from './map-click-overlay.component';

describe('MapClickOverlayComponent', () => {
  let component: MapClickOverlayComponent;
  let fixture: ComponentFixture<MapClickOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapClickOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapClickOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
