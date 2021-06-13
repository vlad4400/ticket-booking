import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-form-make-order',
  templateUrl: './form-make-order.component.html',
  styleUrls: ['./form-make-order.component.scss']
})
export class FormMakeOrderComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  departure: string = this.activatedRoute.snapshot.queryParams['departure']
  arrives: string = this.activatedRoute.snapshot.queryParams['arrives'];
  date: string = this.activatedRoute.snapshot.queryParams['date'];
  tickets: string[] = [...this.activatedRoute.snapshot.queryParams['ticketsStr'].split('-')];
  baggages: string[] = [...this.activatedRoute.snapshot.queryParams['baggagesStr'].split('-')];

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
    private route: Router,
    private order: OrderService
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

  onSubmit() {
    this.form.disable();

    this.order.makeOne({
      departure: this.departure,
      arrives: this.arrives,
      date: this.date,
      ticketsStr: this.activatedRoute.snapshot.queryParams['ticketsStr'],
      baggagesStr: this.activatedRoute.snapshot.queryParams['baggagesStr']
    }).subscribe(
      () => {
        this.route.navigate(['/orders'])
      },
      err => {
        console.warn(err);
        this.form.enable();
      }
    );
  }
}
