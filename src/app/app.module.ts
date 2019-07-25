import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { EventListingComponent } from './event/event-listing/event-listing.component';
import { MasonsryViewComponent } from './shared/layout/masonsry-view/masonsry-view.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { VenuesComponent } from './venue/venues/venues.component';
import { VenueComponent } from './venue/venue.component';
import { VenueListingComponent } from './venue/venue-listing/venue-listing.component';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SearchVenueComponent } from './venue/search-venue/search-venue.component';
import { EditVenueComponent } from './venue/edit-venue/edit-venue.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ReviewsComponent } from './add-review/reviews.component';
import { ApproveReviewComponent } from './approve-reviews/approve-review.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddCampComponent } from './camp/add-camp/add-camp.component';
import { AddHikingTrailComponent } from './hiking/add-hiking/add-hiking.component';
import { CampsComponent } from './camp/camps/camps.component';
import { CampListingComponent } from './camp/camp-listing/camp-listing.component';
import { HikingTrailsListingComponent } from './hiking/hiking-listing/hiking-listing.component';
import { HikingTrailComponent } from './hiking/hiking.component';
import { MasonsryCampViewComponent } from './camp/camp-listing/masonsry-camp-view/masonsry-camp-view.component';
import { MasonsryHikingTrailViewComponent } from './hiking/hiking-listing/masonry-hiking-view/masonry-hiking-view.component';
import { MasonsryVenuesViewComponent } from './venue/masonsry-venues-view/masonsry-venues-view.component';
import { SubscribeVenueComponent } from './venue/subscribe-venue/subscribe-venue.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { EditCampComponent } from './camp/edit-camp/edit-camp.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { HomeHeaderComponent } from './layout/home-header.component';
import { TermsComponent } from './terms/terms.component';
import { PersonalizedComponent } from './personalized/personalized.component';
import { MasonsryVenuesPersonaliseViewComponent } from './masonsry-personalise-view/masonsry-personalise-view.component';
import { EditHikingTrailComponent } from './hiking/edit-hiking/edit-hiking.component';
import { ModalModule } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './layout/callback/callback.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { EventModule } from './event/event.module';
import { CampModule } from './camp/camp.module';
import { VenueModule } from './venue/venue.module';
import { HikingModule } from './hiking/hiking.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    DataEntryComponent,
    ReviewsComponent,
    ApproveReviewComponent,
    MasonsryVenuesPersonaliseViewComponent,
    ComingSoonComponent,
    SignUpComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyComponent,
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent,
    TermsComponent,
    PersonalizedComponent,
    LoginComponent,
    CallbackComponent
  ],
  imports: [
    AppRoutingModule,
    EventModule,
    CampModule,
    VenueModule,
    HikingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxDatatableModule,
    MatCardModule,
    NgMasonryGridModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule,
    FlexLayoutModule,
    MatIconModule,
    AngularFontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ModalModule.forRoot()
  ],
  exports: [MatDatepickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
