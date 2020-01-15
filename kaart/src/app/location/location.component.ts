import {Component, OnInit} from '@angular/core';
import {PdoklocService} from "../services/pdokloc.service";
import {SuggestDoc} from "../services/suggestdoc";
import {LookupGemeente} from "../services/lookupgemeente";
import {LookupWoonplaats} from "../services/lookupwoonplaats";
import {LookupWeg} from "../services/lookupweg";
import {LookupPostCode} from "../services/lookuppostcode";
import {LookupAdres} from "../services/lookupadres";
import {Suggest} from "../services/suggest";
import {SuggestResponse} from "../services/suggestresponse";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  private l_new: string = '';
  private pdokLocService: PdoklocService;
  private static maxRows: number = 15;
  private static l_adreses: string[] = new Array(LocationComponent.maxRows);
  private static l_index: number = 0;
  private adresses: string[];
  private adresses_ids: string[];
  private selected_adres: string;
  private selected_id: string;
  private rd_x:number;
  private rd_y: number;

  constructor(pdokLocService: PdoklocService) {
    this.pdokLocService = pdokLocService;
    this.pdokLocService.setMaxRows(LocationComponent.maxRows);

    for (var i = 1; i <= LocationComponent.maxRows; i++) {
      LocationComponent.l_adreses[i] = '';
    }
  }

  ngOnInit() {
  }

  public onKeydown(value: string) {
    this.l_new = value;
    this.pdokLocService.getSuggest(value)
      .subscribe(suggest => {
//        console.log('numFound: ' + suggest.response.numFound);
//        this.procesResponse(suggest);
//        this.adresses = LocationComponent.l_adreses;
        var data: string[] = Object.keys(suggest.highlighting);
//        console.log("data type: " + typeof(data) + " : " + data);
//        var data0: HighlightSuggest = <HighlightSuggest> data[0];
//        console.log("data[0]: " + data0.suggest);
        var sug: string[] = Array(LocationComponent.maxRows);
        var ids: string[] = Array(LocationComponent.maxRows);
        var len = data.length;
        for (var i = 0; i < len; i++) {
          sug[i] = suggest.highlighting[data[i]].suggest;
          ids[i] = data[i];
        }
        console.log("suggestions: " + sug);
        this.adresses = sug;
        this.adresses_ids = ids;
      });
  }

  /*
  When adres is selected,
  find information on selected adres
   */
  onSelect(adres: string, index: number): void {
    console.log("selected element i: " + index + ' adres: ' + adres + " id: " + this.adresses_ids[index]);
    this.selected_adres = adres;
    this.selected_id = this.adresses_ids[index];
    this.pdokLocService.getLookup(this.selected_id)
      .subscribe(lookup => {
        console.log("Received: " + lookup);
        var result: SuggestResponse = <SuggestResponse> lookup.response;
        if (result.numFound == 1) { // resultaat gevonden
          console.log("Type of result 00: " + typeof(result.docs[0]));
          var doc: (LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres) = <(LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres)>result.docs[0];
          console.log("Type of result 01: " + doc.type);
          var rdstring = doc.centroide_rd;
          console.log("Center coord: " + rdstring);

          var NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
          var coords: string[] = rdstring.match(NUMERIC_REGEXP);
          console.log("coords: " + coords);
          this.rd_x = parseFloat(coords[0]);
          this.rd_y = parseFloat(coords[1]);
          console.log("x: " + this.rd_x + " y: " + this.rd_y);
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
