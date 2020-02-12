import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';

import {LocationComponent} from './location/location.component';
import {LocationExchance} from './services/locationExchance';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { PdoklocService} from './services/pdokloc.service';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LocationExchance],
  bootstrap: [AppComponent]
})
export class AppModule {
}
