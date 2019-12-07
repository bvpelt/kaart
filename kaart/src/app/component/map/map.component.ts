import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MapService } from './map.service';
import { MeasureService } from '../measure/measure.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dso-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  @Input() name: string = MapService.DEFAULT_MAP;

  $measureActive: Observable<boolean>;

  constructor(private mapService: MapService, private measureService: MeasureService) {}

  ngAfterViewInit(): void {
    this.$measureActive = this.measureService.activateState$;
    this.mapService.getMap(this.name).setTarget(this.mapElement.nativeElement.id);
  }
}
