import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventGroupComponent } from './event-group/event-group.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { MasonsryViewComponent } from './masonsry-view/masonsry-view.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { VenuesComponent } from './venues/venues.component';
import { VenueComponent } from './venue/venue.component';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SearchVenueComponent } from './search-venue/search-venue.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabsModule } from '@material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { ReviewsComponent } from './add-review/reviews.component';






@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventGroupComponent,
    EventListingComponent,
    MasonsryViewComponent,
    HomeComponent,
    HelpComponent,
    DataEntryComponent,
    VenuesComponent,
    VenueComponent,
    SearchVenueComponent,
    EditVenueComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    NgMasonryGridModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
