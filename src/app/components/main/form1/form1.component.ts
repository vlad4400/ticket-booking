import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

  dateNow !:string;
  timeNow !:{
    h :number,
    m :number,
    s :number
  };
  temp !:number;
  form = {
    srcCountry: 'lodz',
    selectedData: this.getCurrentDate()
  }
  cnt :number = 1;


  constructor(private route:Router) { }

  ngOnInit(): void {
    this.timeNow = this.getCurrentTime();
    setInterval(() => {
      this.timeNow = this.getCurrentTime();
    }, 500);
    this.dateNow = this.getCurrentDate();
    this.updateTemperature(this.form.srcCountry, this.cnt);
  }

  getDiffInDays(firstdate :string, seconddate :string) {
    let dt1 = firstdate.split('-'),
        dt2 = seconddate.split('-'),
        one = new Date(+dt1[0], +dt1[1]-1, +dt1[2]),
        two = new Date(+dt2[0], +dt2[1]-1, +dt2[2]);

    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let millisBetween = two.getTime() - one.getTime();
    let days = millisBetween / millisecondsPerDay;

    return Math.floor(days);
  }

  updateTemperature(currentCity :string, cnt :number) {

    // weather => forecast/daily  //for correct work
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&id=524901&cnt=${cnt}&units=metric&appid=6c6951e0b5b7141a02703029688c5344`)
      .then( resp => resp.json())
      .then( data => {
          this.temp = data.main.temp;
      });
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const months = today.getMonth();
    const day = today.getDate();

    return `${year}-${(months < 9) ? '0' : ''}${months+1}-${(day < 10) ? '0' : ''}${day}`;
  }

  getCurrentTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    return {h, m, s}
  }

  onChanges() {
    this.cnt = 1 + this.getDiffInDays(this.dateNow, this.form.selectedData);

    if (this.cnt <= 16) {
      this.updateTemperature(this.form.srcCountry, this.cnt)
    };
  }

  onSubmit({value: { departure, arrives, inputDate }} :NgForm) {

    this.route.navigate([`/ticket/${departure}/${arrives}/${inputDate}`]);
  }
}
