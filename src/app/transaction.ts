export class Transaction{
    public customerid:string ;
    public receiveraccountholdernumber:string ;
    public receiveraccountholdername:string ;
    public inramount:number ;
    public receiverBIC:string;
    public transferdate: Date;
    public transfertypecode:string ;
    public messagecode:string ;
    public transferfees:number;

        constructor(
          customerid:string,
          receiveraccountholdernumber:string,
          receiveraccountholdername:string,
          inramount:number,
          receiverBIC:string,
          transferdate:Date,
          transfertypecode:string,
          messagecode:string,
          transferfees:number

      
          ) {
        this.customerid = customerid;
        this.receiveraccountholdernumber= receiveraccountholdernumber;
        this.receiveraccountholdername= receiveraccountholdername;
        this.inramount = inramount;
        this.receiverBIC=receiverBIC;
        this.transferdate=transferdate;
        this.transfertypecode=transfertypecode;
        this.messagecode=messagecode;
        this.transferfees=transferfees;
        }
}