import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiTodoService {
  hostname =
    document.location.protocol +
    '//' +
    document.location.hostname +
    '/api/huevos/';
  constructor(private http: HttpClient) {}

  postData(data: any) {
    console.log(this.hostname);
    return this.http.post<any>(this.hostname, data);
  }

  getAllData() {
    return this.http.get<any>(this.hostname);
  }

  updateData(data: any, id: number) {
    console.log(this.hostname + id);
    return this.http.put<any>(this.hostname + id, data);
  }

  deleteData(id: number) {
    return this.http.delete<any>(this.hostname + id);
  }
}
