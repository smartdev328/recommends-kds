import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampComponent } from './add-camp/add-camp.component';
import { CampListingComponent } from './camp-listing/camp-listing.component';
import { CampsComponent } from './camps/camps.component';
import { EditCampComponent } from './edit-camp/edit-camp.component';

const routes: Routes = [
  {
    path: 'camps-near-me',
    component: CampListingComponent
  },
  {
    path: 'camps/:id',
    component: CampsComponent
  },
  {
    path: 'add-camp',
    component: AddCampComponent
  },
  {
    path: 'edit-camp/:campId',
    component: EditCampComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampRoutingModule { }
