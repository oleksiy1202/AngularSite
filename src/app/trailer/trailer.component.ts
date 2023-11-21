import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {

  trailers: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getKayaks().subscribe(
      (data: any) => {
        console.log(data);
        this.trailers = data.filter((item: any) => item.type === 'трейлер');
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        // Додайте обробник помилок за потреби
      }
    );
  }
}
