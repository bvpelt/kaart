import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { MapClickModule } from '../../views/map-click/map-click.module';
import { PopupModule } from '../popup/popup.module';
import { MeasureModule } from '../measure/measure.module';

@NgModule({
  imports: [CommonModule, MapClickModule, PopupModule, MeasureModule],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [MapService],
    };
  }
}
