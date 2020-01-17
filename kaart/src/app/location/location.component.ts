import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {PdoklocService} from '../services/pdokloc.service';
import {SuggestDoc} from '../services/suggestdoc';
import {LookupGemeente} from '../services/lookupgemeente';
import {LookupWoonplaats} from '../services/lookupwoonplaats';
import {LookupWeg} from '../services/lookupweg';
import {LookupPostCode} from '../services/lookuppostcode';
import {LookupAdres} from '../services/lookupadres';
import {Suggest} from '../services/suggest';
import {SuggestResponse} from '../services/suggestresponse';
import {MapComponent} from '../map/map.component';
import Point from 'ol/geom/Point';
import * as olCoordinate from 'ol/coordinate';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  initialLocation: Point;

  @Output('changedLocationEvent')
  location: EventEmitter<Point> = new EventEmitter<Point>();

  constructor(pdokLocService: PdoklocService) {
    this.pdokLocService = pdokLocService;
    this.pdokLocService.setMaxRows(LocationComponent.maxRows);

    for (let i = 1; i <= LocationComponent.maxRows; i++) {
      LocationComponent.l_adreses[i] = '';
    }
  }

  private static maxRows = 15;
  private static l_adreses: string[] = new Array(LocationComponent.maxRows);
  private static l_index = 0;
  private l_new = '';
  private pdokLocService: PdoklocService;
  private adresses: string[];
  private adresses_ids: string[];
  private selected_adres: string;
  private selected_id: string;
  private rd_x: number;
  private rd_y: number;

  ngOnInit() {
  }

  public onKeydown(value: string) {
    this.l_new = value;
    this.pdokLocService.getSuggest(value)
      .subscribe(suggest => {
//        console.log('numFound: ' + suggest.response.numFound);
//        this.procesResponse(suggest);
//        this.adresses = LocationComponent.l_adreses;
        let data: string[] = Object.keys(suggest.highlighting);
//        console.log("data type: " + typeof(data) + " : " + data);
//        var data0: HighlightSuggest = <HighlightSuggest> data[0];
//        console.log("data[0]: " + data0.suggest);
        let sug: string[] = Array(LocationComponent.maxRows);
        let ids: string[] = Array(LocationComponent.maxRows);
        let len = data.length;
        for (let i = 0; i < len; i++) {
          sug[i] = suggest.highlighting[data[i]].suggest;
          ids[i] = data[i];
        }
        console.log('suggestions: ' + sug);
        this.adresses = sug;
        this.adresses_ids = ids;
      });
  }

  /*
  When adres is selected,
  find information on selected adres
   */
  onSelect(adres: string, index: number): void {
    console.log('selected element i: ' + index + ' adres: ' + adres + ' id: ' + this.adresses_ids[index]);
    this.selected_adres = adres;
    this.selected_id = this.adresses_ids[index];
    this.pdokLocService.getLookup(this.selected_id)
      .subscribe(lookup => {
        console.log('Received: ' + lookup);
        const result: SuggestResponse = lookup.response as SuggestResponse;
        if (result.numFound == 1) { // resultaat gevonden
          console.log('Type of result 00: ' + typeof (result.docs[0]));
          const doc: (LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres) =
            result.docs[0] as (LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres);
          console.log('Type of result 01: ' + doc.type);
          const rdstring = doc.centroide_rd;
          console.log('Center coord: ' + rdstring);

          const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
          const coords: string[] = rdstring.match(NUMERIC_REGEXP);
          console.log('coords: ' + coords);
          this.rd_x = parseFloat(coords[0]);
          this.rd_y = parseFloat(coords[1]);
          console.log('x: ' + this.rd_x + ' y: ' + this.rd_y);
          const coord: olCoordinate = [this.rd_x, this.rd_y];
          const point: Point = new Point(coord, 'XY');
          this.location.emit(point);
          console.log('send point: ' + point);
        }
      });
  }

  private procesResponse(suggest: Suggest): void {
    if (suggest.response.numFound > 0) {
      LocationComponent.l_index = 0;
      LocationComponent.l_adreses.length = 0;
      this.findAdresses(suggest.response.docs);
    } else {
      LocationComponent.l_index = 0;
      LocationComponent.l_adreses.length = 0;
    }
  }

  private findAdresses(docs: (SuggestDoc | LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres)[]): void {
    docs.forEach(this.fillAdres);
  }

  private fillAdres(item: (SuggestDoc | LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres)): void {
    switch (item.type) {
      case 'adres':
        LocationComponent.l_adreses[LocationComponent.l_index++] = item.weergavenaam;
        break;
      case 'weg':
        LocationComponent.l_adreses[LocationComponent.l_index++] = item.weergavenaam;
        break;
      case 'postcode':
        LocationComponent.l_adreses[LocationComponent.l_index++] = item.weergavenaam;
        break;
      case 'gemeente':
        LocationComponent.l_adreses[LocationComponent.l_index++] = item.weergavenaam;
        break;
      case 'woonplaats':
        LocationComponent.l_adreses[LocationComponent.l_index++] = item.weergavenaam;
        break;
      default:
        LocationComponent.l_adreses[LocationComponent.l_index++] = 'type: ' + item.type;
        break;
    }
  }

}
