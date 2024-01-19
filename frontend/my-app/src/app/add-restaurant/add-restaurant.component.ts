import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent implements OnInit{
  userForm=this.fb.group({
    userName:[''],
    email:[''],
    password:[''],
    address:[''],
    resLocation:[''],
    restaurentName:[''],
    contactNo:[''],
    userType:[''],
    createdDate:['']
  })

  isDataUploading=false

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ){}

  ngOnInit(): void { }
  get f(){
    return this.userForm.controls;
  }

  onSubmit(){
    const values =this.userForm.value as User;
    values.createdDate= new Date().toDateString();
    this.userService.addUser(values as User).subscribe((res)=>{
      this.userForm.reset()

    })
    this.isDataUploading=true

  }
}
