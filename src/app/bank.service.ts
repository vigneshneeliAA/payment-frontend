import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from './bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  url:string="http://localhost:8080/bank/";


  getCustomerById(studentId: string): Observable<Bank> {
    return this.http.get<Bank>("http://localhost:8080/bank/" + studentId.trim());
    
}

}
