import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {

  ticketFrom: string = this.route.snapshot.params['from'];
  ticketTo: string = this.route.snapshot.params['to'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
