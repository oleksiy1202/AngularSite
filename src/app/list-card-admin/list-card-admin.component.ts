import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-card-admin',
  templateUrl: './list-card-admin.component.html',
  styleUrls: ['./list-card-admin.component.css']
})
export class ListCardAdminComponent implements OnInit {

  kayaks_list: any[] = []
  add_btn = false
  edit_log_pass = false
  card_admin = true
  name: string = ''
  producer: string = ''
  year: number = 2023
  price: number = 1000
  color: string = ''
  image: string = ''
  type: string = ''
  description: string = ''

  // Доступ до властивостей об'єкта:
  firmName: string = ''
  names: any[] = ['']// Масив імен
  email: any
  login = ''
  password = ''
  tels = [] // Масив телефонів
  password_return: any
  // password_true = false
  constructor(private dataService: DataService) { }
  result_server: any
  admin_arr: any
  // trailers_display = false

  ngOnInit() {
    this.dataService.getKayaks().subscribe(response => {
      this.result_server = response
      this.kayaks_list = this.result_server
    })



    this.dataService.getAdminData().subscribe(response => {
      this.admin_arr = response
      // admin
      this.firmName = this.admin_arr[0].firmName
      this.login = this.admin_arr[0].login
      this.password = this.admin_arr[0].password
      this.email = this.admin_arr[0].email
      // admin
    })
  }


  add_click_btn() {
    this.add_btn = !this.add_btn
    this.edit_log_pass = false
    this.dataService.getKayaks()
  }
  editLogin() {
    this.edit_log_pass = !this.edit_log_pass
    this.card_admin = !this.card_admin
    this.add_btn = false
    this.dataService.getKayaks()
  }
  addKayak() {
    let newKayak = {
      name: this.name,
      producer: this.producer,
      year: this.year,
      price: this.price,
      color: this.color,
      image: this.image,
      type: this.type,
      description: this.description
    }
    this.kayaks_list.push(newKayak)
    this.dataService.addKayak(newKayak).subscribe((response) => {
      console.log('Дані додані до JSON файлу', response)
      this.name = ''
      this.producer = ''
      this.year = 0
      this.price = 0
      this.color = ''
      this.image = ''
      this.type = ''
      this.description = ''
    })
    this.dataService.getKayaks()
  }


  password_true = false

  edit_form_admin() {
    if (this.password !== this.password_return) {
      alert("Паролі не співпадають")
      return; // Перервіть виконання функції, якщо паролі не співпадають
    }
    if (this.password.length < 6) {
      alert("Пароль повинен містити принаймні 6 символів");
      return; // Перервіть виконання функції, якщо пароль надто короткий
    }
    // Додайте інші перевірки на пароль за потреби
    this.password_true = true
    this.admin_arr[0].firmName = this.firmName
    this.admin_arr[0].login = this.login
    this.admin_arr[0].password = this.password
    this.admin_arr[0].email = this.email
    this.password_return = this.password

    console.log(this.admin_arr[0]);

    console.log(this.admin_arr);

    this.dataService.editAdmin(this.admin_arr).subscribe(
      response => {
        console.log('Дані оновлені', response);
        this.dataService.getAdminData();
        alert('Дані оновлені');
      },
      error => {
        console.error('Помилка оновлення даних', error);
        alert('Помилка оновлення даних');
      }
    );
    this.dataService.getKayaks();
  }

  deleteKayak(id: number) {
    Swal.fire({
      title: `Ви впевнені, що хочете видалити каяк #${id}?`,
      text: "Цю дію неможливо буде скасувати!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Скасувати',
      confirmButtonText: 'Так, видалити!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteKayak(id).subscribe(() => {
          Swal.fire(
            'Видалено!',
            `Ваш файл ${id} видалено.`,
            'success'
          )
          // Оновіть список, отримавши дані знову
          this.dataService.getKayaks().subscribe((data: any) => {
            this.kayaks_list = data
          })
        })
      }
    })
  }


  // getTrailersBTN() {
  //   console.log(this.kayaks_list);
  // }

}
