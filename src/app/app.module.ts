import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material';
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
    CallbackComponent
  ],
  imports: [
    AppRoutingModule,
    EventModule,
    CampModule,
    VenueModule,
    HikingModule,
    SharedModule,
    SharedLibsModule,
    BrowserModule,
    BrowserAnimationsModule
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
