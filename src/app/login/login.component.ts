import { Component } from '@angular/core';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any = null;
  formLogin = '';
  formPassword = '';
  condition = true;
  condition_content = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAdminData().subscribe(
      (data: any) => {
        this.users = data[0];
      },
      (error) => {
        console.error('Помилка отримання даних адміністратора:', error);
      }
    );
  }

  submitBtn() {
    if (this.users) {
      if (this.formLogin !== this.users.login || this.formPassword !== this.users.password) {
        Swal.fire({
          icon: 'error',
          title: 'Невірний логін або пароль',
          text: 'Повторіть спробу ще раз!',
          footer: '<a href=""></a>'
        });
        this.formLogin = '';
        this.formPassword = '';
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Ви зайшли під ім'ям: <b>${this.users.name[1]}</b>`,
          showConfirmButton: false,
          timer: 1500
        });
        this.condition = false;
        this.condition_content = true;
      }
    } else {
      console.error('Дані адміністратора ще не завантажені.');
    }
  }
}
