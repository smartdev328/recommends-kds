import { Component, OnInit } from '@angular/core';
import {TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{SignUpComponent} from '../sign-up/sign-up.component';

@Component({
  selector: 'app-layout-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})

export class HomeHeaderComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  public navbarCollapsed = true;
  ngOnInit() {
    
  }
  openModal() {
    const initialState = {class: 'modal-lg',listener: this};
    this.modalRef = this.modalService.show(SignUpComponent,initialState);
  }
}
