import { NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule} from '@angular/platform-browser';
import { Pagination}   from './app.paginationComponent';

@NgModule({
  imports:      [ BrowserModule,FormsModule ],
  declarations: [ Pagination],
  bootstrap:    [ Pagination]
})
export class AppModule { }
