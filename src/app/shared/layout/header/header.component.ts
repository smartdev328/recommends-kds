import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignUpComponent } from 'app/component/sign-up/sign-up.component';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  public navbarCollapsed = true;
  ngOnInit() {

  }
  openModal() {
    const initialState = { class: 'modal-lg', listener: this };
    this.modalRef = this.modalService.show(SignUpComponent, initialState);
  }
}
