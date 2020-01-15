# kaart
Kaart

## Aanmaken project
- https://www.c-sharpcorner.com/article/how-to-create-simple-angular-project-using-node-js-and-vs-code/

At top level
```
$ npm install npm -2 @angular/cli
$ ng new kaart
$ cd kaart
$ npm install ngx-openlayers
$ ng generate module app-routing --flat --module=app
$ ng generate component map
```

## Create a service
``` 
$ ng generate service services/pdoklocatie
```
## WMTS
http://geodata.nationaalgeoregister.nl/tiles/service/wmts?REQUEST=GetCapabilities

## CSS
### Split screen
- https://www.w3schools.com/howto/howto_css_split_screen.asp
## Locatie Server
Default query
- example suggest https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=Veenendaal&fl=id,weergavenaam,type,score&sort=score desc, sortering asc, weergavenaam asc&qf=score desc, sortering asc, weergavenaam asc&bq=type:provincie^1.5 type:gemeente^1.5 type:woonplaats^1.5 type:weg^1.5 type:postcode^0.5 type:adres^1&rows=10&wt=json&indent=true&lat=52.09&lon=5.12&fq=type:(gemeente OR woonplaats OR weg OR postcode OR adres)
- example lookup https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=gem-d0ccd69056678531945827988e55cbcf

- https://raw.githubusercontent.com/PDOK/open-api-specs/master/locatieserver/oas.yaml

# Referenties
- https://angular.io/cli
- https://angular.io/tutorial
- https://openlayers.org/
- use EPSG:28892 projection with openlayers https://gis.stackexchange.com/questions/226888/adding-a-projection-in-openlayers
- https://codeburst.io/https-chidume-nnamdi-com-npm-module-in-typescript-12b3b22f0724?gi=5a3539cceb9a
