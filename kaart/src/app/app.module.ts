import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { MapClickOverlayComponent } from './component/map-click-overlay/map-click-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapClickOverlayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
