import {Component, EventEmitter, Input} from '@angular/core';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kaart';

  @Input('init')
  changedLocation: Point = null;

  locationChanged(event: EventEmitter<Point>) {
    this.changedLocation = event;
    console.log('Received event: ' + event);
    console.log('Received new location: ' + this.changedLocation);
    //const geom: Geometry = this.changedLocation;

  }
}
