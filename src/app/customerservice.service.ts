import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

  
  constructor(private http: HttpClient) { }

  url:string="http://localhost:8080/customer/";

  public getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }
  getCustomerById(studentId: string): Observable<Customer> {
    return this.http.get<Customer>("http://localhost:8080/customer/" + studentId.trim());
    
}
}
