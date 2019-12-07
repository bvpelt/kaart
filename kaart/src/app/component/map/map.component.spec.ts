import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { MapClickModule } from '../../views/map-click/map-click.module';
import { Config } from '../../../services/config';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ShowHideModule } from '../../../animations/show/show-hide.module';
import { MapModule } from './map.module';
import { MeasureService } from '../measure/measure.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../store/reducers';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MapClickModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        NoopAnimationsModule,
        ShowHideModule,
        MapModule,
      ],
      declarations: [],
      providers: [MapService, Config, MeasureService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
