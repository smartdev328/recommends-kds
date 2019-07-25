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
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ReviewsComponent } from './add-review/reviews.component';
import { ApproveReviewComponent } from './approve-reviews/approve-review.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
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
