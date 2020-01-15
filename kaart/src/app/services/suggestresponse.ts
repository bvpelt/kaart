import {SuggestDoc} from "./suggestdoc";
import {LookupGemeente} from "./lookupgemeente";
import {LookupWoonplaats} from "./lookupwoonplaats";
import {LookupWeg} from "./lookupweg";
import {LookupPostCode} from "./lookuppostcode";
import {LookupAdres} from "./lookupadres";

export class SuggestResponse {
  public numFound: number;
  public start: number;
  public maxScore: number;
  public docs: (SuggestDoc | LookupGemeente | LookupWoonplaats | LookupWeg | LookupPostCode | LookupAdres)[];
}
