import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    let url = environment.API + '/customers/';
    return this.http.get(url);
  }

  createCustomer(customer: {}) {
    let url = environment.API + '/customers/';
    return this.http.post(url, customer);
  }

  updateCustomer(customer: {}, id:number): Observable<any> {
    let url = environment.API + '/customers/' + id + '/';
    return this.http.put(url, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    let url = environment.API + '/customers/' + id + '/';
    return this.http.delete(url);
  }
}
