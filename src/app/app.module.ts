import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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
import { VenueListingComponent } from './venue-listing/venue-listing.component';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SearchVenueComponent } from './search-venue/search-venue.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { ReviewsComponent } from './add-review/reviews.component';
import { ApproveReviewComponent } from './approve-reviews/approve-review.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { AddCampComponent } from './add-camp/add-camp.component';
import { AddHikingTrailComponent } from './add-hiking/add-hiking.component';
import { CampsComponent } from './camps/camps.component';
import { CampListingComponent } from './camp-listing/camp-listing.component';
import { HikingTrailsListingComponent } from './hiking-listing/hiking-listing.component';
import { HikingTrailComponent } from './hiking/hiking.component';
import { MasonsryCampViewComponent } from './camp-listing/masonsry-camp-view/masonsry-camp-view.component';
import { MasonsryHikingTrailViewComponent } from './hiking-listing/masonry-hiking-view/masonry-hiking-view.component';
import { MasonsryVenuesViewComponent } from './masonsry-venues-view/masonsry-venues-view.component';
import { SubscribeVenueComponent } from './subscribe-venue/subscribe-venue.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { EditCampComponent } from './edit-camp/edit-camp.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { TermsComponent } from './terms/terms.component';
import { PersonalizedComponent } from './personalized/personalized.component';
import { MasonsryVenuesPersonaliseViewComponent } from './masonsry-personalise-view/masonsry-personalise-view.component';
import { EditHikingTrailComponent } from './edit-hiking/edit-hiking.component';



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
    VenueListingComponent,
    SearchVenueComponent,
    EditVenueComponent,
    ReviewsComponent,
    ApproveReviewComponent,
    AddCampComponent,
    AddHikingTrailComponent,
    CampsComponent,
    CampListingComponent,
    HikingTrailsListingComponent,
    HikingTrailComponent,
    MasonsryCampViewComponent,
    MasonsryHikingTrailViewComponent,
    MasonsryVenuesViewComponent,
    MasonsryVenuesPersonaliseViewComponent,
    SubscribeVenueComponent,
    ComingSoonComponent,
    EditCampComponent,
    EditEventComponent,
    EditHikingTrailComponent,
    SignUpComponent,
    HeaderComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
    PersonalizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    MatCardModule,
    NgMasonryGridModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule,
    FlexLayoutModule,
    MatIconModule,
    AngularFontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [MatDatepickerModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
