import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  addTransaction(transaction:Transaction):Observable<number>{
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<Transaction>("http://localhost:8080/transaction",JSON.stringify(transaction) , {
      headers: httpHeaders,
      observe: 'response'
    }).pipe(
      map(res=>res.status),
      catchError(this.handleError)
    );
  }



 private handleError(error: any) {
  console.error(error);
  return throwError(error);
}
}
