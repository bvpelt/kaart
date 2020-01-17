import {Component, Input} from '@angular/core';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kaart';

  initialLocation: Point;

}
