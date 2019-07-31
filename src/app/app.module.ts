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
import { HomeComponent } from './component/home/home.component';
import { HelpComponent } from './component/help/help.component';
import { DataEntryComponent } from './component/data-entry/data-entry.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ReviewsComponent } from './component/add-review/reviews.component';
import { ApproveReviewComponent } from './component/approve-reviews/approve-review.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComingSoonComponent } from './component/coming-soon/coming-soon.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { TermsComponent } from './component/terms/terms.component';
import { PersonalizedComponent } from './component/personalized/personalized.component';
import { ModalModule } from 'ngx-bootstrap';
import { LoginComponent } from './component/login/login.component';
import { CallbackComponent } from './component/callback/callback.component';
import { AuthInterceptor } from './shared/service/auth.interceptor';
import { EventModule } from './event/event.module';
import { CampModule } from './camp/camp.module';
import { VenueModule } from './venue/venue.module';
import { HikingModule } from './hiking/hiking.module';
import { SharedModule } from '@shared/shared.module';
import { SharedLibsModule } from '@shared/shared-libs.module';



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
