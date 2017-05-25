import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';

//beging my code
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExceptionsComponent } from './exceptions.components';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ExceptionsDB } from './exceptions-db';

var routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
}];
@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes), InMemoryWebApiModule.forRoot(ExceptionsDB) ],    
  declarations: [ AppComponent, ExceptionsComponent ],
  bootstrap:    [ AppComponent, ExceptionsComponent ]
})
export class AppModule { }
