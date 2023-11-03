import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment'; // Імпорт moment.js
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  firmName = ''
  tel = ''
  name = ''
  formattedDate: string
  adminData: any
  deweloper: string = "oleksiy_kuzminov"

  constructor(private dataService: DataService) {
    moment.locale('uk');
    this.formattedDate = moment().format('LL');
  }
  ngOnInit() {
    this.dataService.getAdminData().subscribe(data => {
      this.adminData = data
      this.firmName = this.adminData[0].firmName
      this.tel = this.adminData[0].tel
      this.name = this.adminData[0].name
    })
  }
}
