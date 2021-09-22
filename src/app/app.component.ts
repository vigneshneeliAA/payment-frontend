import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerserviceService } from './customerservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Http Client Application - 1';

  customers = new Array<Customer>();

  constructor(customerService:CustomerserviceService){
    customerService.getAllCustomers().subscribe( response=>{
      this.customers = response.map( item => {
        return new Customer(item.customerid, item.accountholdername, item.overdraftflag,item.clearbalance);
      });
    });
  }
}
