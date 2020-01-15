import {SuggestResponse} from "./suggestresponse";
import {SuggestSpellCheck} from "./suggestspellcheck";

export class Suggest {
  public response: SuggestResponse;
  public highlighting: any;
  public spellcheck: SuggestSpellCheck;
}
