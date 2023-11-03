import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  kayaks: any[] = []
  searchText: string = ''
  searchResults: any[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getKayaks().subscribe((data: any) => {
      this.kayaks = data
    })
  }

  selectedType: string = ''
  value1: any
  filterByType(type: string, value: string) {
    this.selectedType = type
    this.value1 = value
  }

  showByType(type: string): boolean {
    return this.selectedType === '' || type === this.selectedType
  }

  allProducts() {
    this.selectedType = ''
  }

  search(): void {
    if (this.searchText.trim() === '') {
      this.searchResults = [];
    } else {
      console.log(this.kayaks);

      this.searchResults = this.kayaks.filter(kayak => {
        return kayak.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          kayak.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
          kayak.price.toString().includes(this.searchText.toLowerCase()) ||
          kayak.producer.toLowerCase().includes(this.searchText.toLowerCase()) ||
          kayak.color.toLowerCase().includes(this.searchText.toLowerCase()) ||
          kayak.year.toString().includes(this.searchText.toLowerCase())
      });
    }
  }

}
