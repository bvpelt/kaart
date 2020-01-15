import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';

import {LocationComponent} from './location/location.component';
/* import {PDOKLocatieModule, PDOKLocatieService} from "./services/pdoklocatie"; */



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
