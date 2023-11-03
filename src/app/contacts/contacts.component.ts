import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  firmName = ''
  tel = ''
  name = ''
  adminData: any

  constructor(private dataService: DataService) {
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
