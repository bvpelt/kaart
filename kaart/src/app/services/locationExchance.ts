import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Point from 'ol/geom/Point';
import {toStringXY} from 'ol/coordinate';

@Injectable()
export class LocationExchance {

  private coordinate =  [12744, 44317];
  private defaultPoint: Point = new Point(this.coordinate);

  private location = new BehaviorSubject(this.defaultPoint);
  currentLocation = this.location.asObservable();

  constructor() { }

  changeLocation(point: Point) {
    console.log('LocationExchange - point: ' + toStringXY(point.getCoordinates()));
    this.location.next(point);
  }
}
