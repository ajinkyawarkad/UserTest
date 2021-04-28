import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthserviceProvider {
 
  public userProfileRef:firebase.database.Reference;
  constructor(public http: HttpClient) {
    
    console.log('Hello AuthserviceProvider Provider');
  }
}
  
