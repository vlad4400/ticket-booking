import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: string[] = ['In developing']

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get('/api/order/getAll');
  }

  makeOne(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order/makeOne', order);
  }

  delete() {

  }
}
