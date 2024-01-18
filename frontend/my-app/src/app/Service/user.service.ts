import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AddUserResponse } from '../model/add-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost:5000"


  constructor(private http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }
  addUser(user:User){
    return this.http.post<AddUserResponse>(`${this.baseUrl}/restaurant/addrestaurant`,user,this.httpOptions);
  }

}
