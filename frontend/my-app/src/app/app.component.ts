import { Component,OnInit } from '@angular/core';
import { CommonService } from './Service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {
  title = 'my-app';
  location:any;
  constructor(private commonService:CommonService){

  }
  ngOnInit(): void {
      this.commonService.getLocation().subscribe((data)=>{
        console.log(data);
        this.location=data;
      })
  }
}
