import {Component} from '@angular/core';
import Point from 'ol/geom/Point';
import {LocationExchance} from './services/locationExchance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kaart';

  private currentLocation: Point;

  constructor(private location: LocationExchance) {
  }

  ngOnInit() {
    this.location.currentLocation.subscribe(point => this.currentLocation = point);
  }
}
