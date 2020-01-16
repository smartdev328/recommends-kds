import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDatepickerModule ,MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibsModule } from '@shared/shared-libs.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampModule } from './camp/camp.module';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ReviewsComponent } from './component/add-review/reviews.component';
import { ApproveReviewComponent } from './component/approve-reviews/approve-review.component';
import { CallbackComponent } from './component/callback/callback.component';
import { ComingSoonComponent } from './component/coming-soon/coming-soon.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { DataEntryComponent } from './component/data-entry/data-entry.component';
import { HelpComponent } from './component/help/help.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PersonalizedComponent } from './component/personalized/personalized.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { TermsComponent } from './component/terms/terms.component';
import { EventModule } from './event/event.module';
import { HikingModule } from './hiking/hiking.module';
import { AuthInterceptor } from './shared/service/auth.interceptor';
import { VenueModule } from './venue/venue.module';
import { ProfileComponent } from './component/profile/profile.component';
import { GetStartedComponent } from './component/get-started/get-started.component';
import {SwalService }         from './shared/service/swal.service';
import { MiddlewareComponent } from './middleware/middleware.component';
import { SavedComponent } from './component/saved/saved.component';
import { SavedListingComponent } from './component/saved/saved-listing/saved-listing.component';
import { MasonsrySavedViewComponent } from './component/saved/masonsry-saved-view/masonsry-saved-view.component';
import { MasonrySubscribeViewComponent } from './component/saved/masonry-subscribe-view/masonry-subscribe-view.component';
import { MasonsryVenuesPersonaliseViewComponent } from '@shared/layout/masonsry-personalise-view/masonsry-personalise-view.component';
import { CityModule } from './city/city.module';
import { ClassesModule } from './classes/classes.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    DataEntryComponent,
    ReviewsComponent,
    ApproveReviewComponent,
    ComingSoonComponent,
    SignUpComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyComponent,
    TermsComponent,
    PersonalizedComponent,
    LoginComponent,
    CallbackComponent,
    ProfileComponent,
    GetStartedComponent,
    MiddlewareComponent,
    SavedComponent,
    SavedListingComponent,
    MasonsrySavedViewComponent,
    MasonrySubscribeViewComponent,
  ],
  imports: [
    AppRoutingModule,
    EventModule,
    CampModule,
    VenueModule,
    HikingModule,
    SharedModule,
    CityModule,
    ClassesModule,
    SharedLibsModule,
    BrowserModule,
    BrowserAnimationsModule,
    
  ],
  exports: [MatDatepickerModule,MatDialogModule,
    MasonsrySavedViewComponent,MasonrySubscribeViewComponent,
    MasonsryVenuesPersonaliseViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    SwalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
