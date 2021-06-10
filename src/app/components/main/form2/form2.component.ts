import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {

  departure: string = this.activatedRoute.snapshot.params['departure'];
  arrives: string = this.activatedRoute.snapshot.params['arrives'];
  date: string = this.activatedRoute.snapshot.params['date'];

  plane :{
    seat :number,
    available :boolean
  }[] = [];
  planeType !: 1 | 2 | 3;
  planeTypes = {
    1: {
      seats: 78
    },
    2: {
      seats: 189
    },
    3: {
      seats: 330
    }
  }
  tickets :number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    switch (this.departure) {
      case 'lodz':
        switch (this.arrives) {
          case 'kiev':
            this.planeType = 3;
            break;
          case 'krakow':
            this.planeType = 1;
            break;
          case 'odessa':
            this.planeType = 2;
            break;

          default:
            break;
        }
        break;
      case 'warsaw':
        switch (this.arrives) {
          case 'kiev':
            this.planeType = 2;
            break;
          case 'krakow':
            this.planeType = 1;
            break;
          case 'odessa':
            this.planeType = 3;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    for (let i = 1; i <= this.planeTypes[this.planeType].seats; i++) {
      this.plane.push({
          seat: i,
          available: !Math.floor(Math.random() * 2)   // to get boolean type: 50% - true, 50% - false;
      });
    }
  }


  pick(event :any) {
    let e = event.srcElement.attributes.class.value;

    if (e.split(' ').includes('available')) {
      if (this.tickets.length < 7) {
        this.renderer.removeClass(event.target, 'available');
        this.renderer.addClass(event.target, 'reserve');
        this.tickets = [...this.tickets, event.target.id.substring(5)];
      } else {
        alert('Ticket limit reached (max: 7)');
      }
    } else if (e.split(' ').includes('reserve')) {
      let n = event.target.id.substring(5);
      this.tickets = this.tickets.filter(value => {
        return value != n;
      });
      this.renderer.removeClass(event.target, 'reserve');
      this.renderer.addClass(event.target, 'available');
    }

  }

  onSubmit(f: NgForm) {

    if (this.tickets.length) {
      let ticketsStr = this.tickets.join('-');

      this.route.navigate([`/ticket/${this.departure}/${this.arrives}/${this.date}/${ticketsStr}`]);
    }
  }

}
