import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.scss']
})
export class Form3Component implements OnInit {

  departure: string = this.activatedRoute.snapshot.params['departure'];
  arrives: string = this.activatedRoute.snapshot.params['arrives'];
  date: string = this.activatedRoute.snapshot.params['date'];
  tickets = [...this.activatedRoute.snapshot.params['tickets'].split('-')];


  plane :{
    seat :number,
    available :boolean
  }[] = [];
  planeType !: 1 | 2 | 3;

  currencies :{
    code :string,
    currency :string,
    mid :number
  }[] = [{
      code: 'PLN',
      currency: 'złoty (Poland)',
      mid: 1
  }];
  biletPricePLN !:number;
  fullPrice !:number;
  currentNumberCurrency = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    switch (this.departure) {
      case 'lodz':
        switch (this.arrives) {
          case 'kiev':
            this.planeType = 3;
            this.biletPricePLN = 120;
            break;
          case 'krakow':
            this.planeType = 1;
            this.biletPricePLN = 75;
            break;
          case 'odessa':
            this.planeType = 2;
            this.biletPricePLN = 130;
            break;

          default:
            break;
        }
        break;
      case 'warsaw':
        switch (this.arrives) {
          case 'kiev':
            this.planeType = 2;
            this.biletPricePLN = 110;
            break;
          case 'krakow':
            this.planeType = 1;
            this.biletPricePLN = 70;
            break;
          case 'odessa':
            this.planeType = 3;
            this.biletPricePLN = 140;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    this.setExchangeRate();
    this.calcFullPrice();
  }

  calcFullPrice() {
    this.fullPrice = Math.floor(this.biletPricePLN * this.tickets.length / this.currencies[this.currentNumberCurrency].mid);
  }

  setExchangeRate() {
    fetch('https://api.nbp.pl/api/exchangerates/tables/a/?format=json')
      .then(data => data.json())
      .then(([{rates: array}]) => array.map((el :any, idx :number) => {
          this.currencies.push(el);
      }))
      .catch(err => console.log(err));
  }

  onChangeCurr() {
    this.calcFullPrice();
  }

  onSubmit(f: NgForm) {

    if (this.tickets.length) {
      let baggages :string[] = [];

      baggages = this.tickets.map(value=>{
        return f.value['bagaz-' + value]
      });

      let ticketsStr = this.tickets.join('-');
      let baggagesStr = baggages.join('-');

      // this.route.navigate([`/login/${this.departure}/${this.arrives}/${this.date}/${ticketsStr}/${baggagesStr}`]);
      this.route.navigate(['orders/make'], {
        queryParams: {
          departure: this.departure,
          arrives: this.arrives,
          date: this.date,
          ticketsStr,
          baggagesStr
        }
      });
    }
  }
}
