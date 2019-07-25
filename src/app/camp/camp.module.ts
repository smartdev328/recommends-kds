import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampRoutingModule } from './camp-routing.module';
import { CampListingComponent } from './camp-listing/camp-listing.component';
import { MasonsryCampViewComponent } from './camp-listing/masonsry-camp-view/masonsry-camp-view.component';
import { CampsComponent } from './camps/camps.component';
import { AddCampComponent } from './add-camp/add-camp.component';
import { EditCampComponent } from './edit-camp/edit-camp.component';
import { SharedModule } from 'app/shared/shared.module';
import { SharedLibsModule } from 'app/shared/shared-libs.module';

@NgModule({
  imports: [
    CommonModule,
    CampRoutingModule,
    SharedModule,
    SharedLibsModule
  ],
  declarations: [
    CampListingComponent,
    MasonsryCampViewComponent,
    CampsComponent,
    AddCampComponent,
    EditCampComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampModule { }
