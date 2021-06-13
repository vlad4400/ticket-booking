import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/services/interfaces';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  tickets: {
    placeNumber: String,
    baggageType: String
  }[][] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(
      (data) => {
        this.orders = data.orders;

        this.orders.forEach((order) => {
          let tempTickets = order.ticketsStr.split('-');
          let tempBaggages = order.baggagesStr.split('-');

          let tempArray: {
            placeNumber: String,
            baggageType: String
          }[] = [];
          tempTickets.forEach((placeNumber: String, i: number) => {
            tempArray.push({placeNumber, baggageType: tempBaggages[i]});
          });
          this.tickets.push(tempArray);
        });
      },
      err => {
        console.warn(err);
      }
    );
  }

}
