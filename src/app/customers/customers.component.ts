import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BankService } from '../bank.service';
import { CustomerserviceService } from '../customerservice.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

interface Transfer{
  transferdate: Date;
  transfertypecode:string ;
  messagecode:string ;
  customerid:string ;
  receiveraccountholdernumber:string ;
  receiveraccountholdername:string ;
  inramount:number ;
  receiverBIC:string;
transferfees:number;
}
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  transaction!:Transfer;
  status!: number;
  messages:string[]=['HOLD','SDVA','REPA','PHOI','PHON','PHOB','INTC','CORT','CHQB'];
   customerNotFound:boolean = false;
  errorCode: any;
  fees!:number;
  overdraft:boolean=false;
  overdraftcheck:boolean=false;
totalbalance!:number;
banknotFound:boolean=false;
totalbalanceflag:boolean=false;
transferstatus:boolean=false;
checkstatus:boolean=false;
sdnMessage:string="";

  constructor(private customerService:CustomerserviceService,private bankService:BankService,
    private transactionService:TransactionService
    ) {
    console.log(this.customerService);
    console.log(this.bankService);
   }
   

  ngOnInit(): void {
  }

  onCustomerFormSubmit($event:any,customerform:NgForm){

     
     this.customerService.getCustomerById($event.target.value)
     .subscribe(
       (data: { customerid: any; accountholdername: any; clearbalance:any; overdraftflag:number;}) => {
            customerform.controls['customerid'].setValue(data.customerid);
           customerform.controls['accountholdername'].setValue(data.accountholdername);
           customerform.controls['balance'].setValue(data.clearbalance);
           if(data.overdraftflag==1)
           {
            this.overdraft=true;
          }
          else
          {
            this.overdraft=false;
          }
          this.overdraftcheck=true;
        this.totalbalance=data.clearbalance;
           
        },
        err => {
          if(err.status==500){
            this.customerNotFound=true;
            customerform.controls['accountholdername'].setValue(null);
            customerform.controls['clearbalance'].setValue(null);
            this.overdraftcheck=false;
          }
        }

       );
    }

onBankFormSubmit($event:any,customerform:NgForm){

       this.bankService.getCustomerById($event.target.value)
       .subscribe(
         (       data: { bic: any; bankname:any }) => {
              customerform.controls['receiverBIC'].setValue(data.bic);
             customerform.controls['bankname'].setValue(data.bankname);
        },
      err=>
      {
        if(err.status==500)
        {
                 this.banknotFound=true;
        }
      }

  
         );
      
      }
      calculateFees($event:any,form:NgForm){

        
        this.fees=$event.target.value*0.25;
        if(this.overdraft==true){
          this.totalbalanceflag=true;
   }
   else if(this.overdraft==false&&this.totalbalance>$event.target.value){
    this.totalbalanceflag=true;
   }
   else if(this.overdraft==false&&this.totalbalance<$event.target.value){
     this.totalbalanceflag=false;
   }
  
    }
  onSubmit(transfer:NgForm){

    //console.log(JSON.stringify(transfer));
 
     this.transactionService.addTransaction(transfer.form.value)
             .subscribe(statusCode => {
      
               this.status = statusCode;
               this.sdnMessage=''; 
             },
               errorCode =>{ this.status = errorCode;
               this.sdnMessage=this.errorCode.error.message;
               }
               

             );
               this.transferstatus=true;
     console.log(JSON.stringify(transfer.form.value));
     this.overdraftcheck=false;
    transfer.resetForm();
   }



  


}
