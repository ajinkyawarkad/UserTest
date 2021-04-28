import { Time } from "@angular/common";

export class User{
    name:string;
    email:string;
    password:string;
    phoneno:string;
    company_name:string;
    compId:string;
  
}

export class Employee{
    name:string;
    email:string;
    last:string;
    role:string;
}

export class Counts{
    runTime=new Date();
    


    
}

export class Camp
{
    name:string;
    goals:string;
    manager:string;
    sr:string;
    sId:string;
}

export class Lead
{
    //data:string;
    sr:string;
    sId:string;
}
export class Leadref
{
    first_name:string;
    last_name:string;
    email:string;
    phone:string;
}

export class Leadd{
    action:string;
    datetime1:string;
    selected_value:string;
    remark:string;
}
export class Sts{
    sts1:string;
    sts2:string;
    action1:string;
    action2:string;

}