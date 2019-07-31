import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedLibsModule } from 'app/shared/shared-libs.module';
import { SharedModule } from 'app/shared/shared.module';
import { AddCampComponent } from './add-camp/add-camp.component';
import { CampListingComponent } from './camp-listing/camp-listing.component';
import { MasonsryCampViewComponent } from './camp-listing/masonsry-camp-view/masonsry-camp-view.component';
import { CampRoutingModule } from './camp-routing.module';
import { CampsComponent } from './camps/camps.component';
import { EditCampComponent } from './edit-camp/edit-camp.component';


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
