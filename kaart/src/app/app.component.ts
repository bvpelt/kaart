import {Component, OnInit} from '@angular/core';
import Point from 'ol/geom/Point';
import {toStringXY} from 'ol/coordinate';
import {LocationExchance} from "./services/locationExchance";
import * as olCoordinate from 'ol/coordinate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kaart';

  private currentLocation: Point;

  constructor(private location: LocationExchance) {}

  ngOnInit() {
    this.location.currentLocation.subscribe(point => this.currentLocation = point);
  }
}
