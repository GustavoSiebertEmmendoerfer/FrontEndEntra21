import { User } from "./user";

export class OrderResponse
{
    OrderId:number = 0;
    Status:string = "";
    Client:User = null;
    Restaurant:User = null

}