import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatTabsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMasonryGridModule } from 'ng-masonry-grid';

const MATERIAL_MODULES = [
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  exports: [
    AngularFontAwesomeModule,
    FlexLayoutModule,
    NgSelectModule,
    BsDropdownModule,
    NgxDatatableModule,
    NgMasonryGridModule,
    ...MATERIAL_MODULES
  ]
})
export class SharedLibsModule { }
