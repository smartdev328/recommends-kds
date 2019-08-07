import { Component, OnInit } from '@angular/core';

const DAY_IN_WEEK_INDEX = 6;

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  daysOfWeek: string[];
  calenderDays: Date[];

  constructor() { }

  ngOnInit() {
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.calenderDays = this.getDaysOfMonth(new Date().getMonth(), new Date().getFullYear());
  }

  getDaysOfMonth(month: number, year: number) {
    const result: Date[] = [];
    const numberOfDays = new Date(year, month, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      result.push(new Date(year, month, i));
    }
    return this.fillCalendar(month, year, result);
  }

  fillCalendar(month: number, year: number, daysOfMonth: Date[]) {
    const fillStart = new Date(year, month, 1).getDay();
    const fillEnd = DAY_IN_WEEK_INDEX - new Date(year, month + 1, 0).getDay();
    const lastMonthEndDate = new Date(year, month - 1, 0);
    const nextMonthStartDate = new Date(year, month + 1, 1);
    for (let i = 0; i < fillStart; i++) {
      daysOfMonth.unshift(new Date(lastMonthEndDate.getFullYear(), lastMonthEndDate.getMonth(), lastMonthEndDate.getDate() - i));
    }
    for (let i = 0; i < fillEnd; i++) {
      daysOfMonth.push(new Date(nextMonthStartDate.getFullYear(), nextMonthStartDate.getMonth(), i));
    }
    return daysOfMonth;
  }

}
