import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  daysOfWeek: string[];
  daysOfMonth: number[];

  constructor() { }

  ngOnInit() {
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.daysOfMonth = this.getDaysOfMonth(new Date().getMonth(), new Date().getFullYear());
  }

  getDaysOfMonth(month: number, year) {
    const result = [];
    const numberOfDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      result.push(i);
    }
    return result;
  }

}
