import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firmName = ''
  adminData: any

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.getAdminData().subscribe(data => {
      this.adminData = data
      this.firmName = this.adminData[0].firmName
    })
  }
}
