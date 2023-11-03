import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getKayaks() {
    return this.http.get(`${this.serverUrl}/kayaks`);
  }

  getAdminData() {
    return this.http.get(`${this.serverUrl}/admin`);
  }

  addKayak(newKayak: any): Observable<any> {
    return this.http.post(`${this.serverUrl}/kayaks`, newKayak);
  }

  deleteKayak(id: number): Observable<any> {
    console.log(123);

    return this.http.delete(`${this.serverUrl}/kayaks/${id}`);
  }

  editAdmin(updatedData: any): Observable<any> {
    console.log(123);
    return this.http.put(`${this.serverUrl}/admin`, updatedData);
  }

}
