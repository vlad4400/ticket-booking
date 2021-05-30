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

  constructor(private route:Router) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.dateNow = this.currentTime();
  }

  currentTime(){
    const today = new Date();
    const year = today.getFullYear();
    const months = today.getMonth();
    const day = today.getDate();

    return `${year}-0${months+1}-${day}`;
  }

  onSubmit({value: { departure, arrives, inputDate }} :NgForm) {

    this.route.navigate([`/ticket/${departure}/${arrives}/${inputDate}`]);
  }
}
