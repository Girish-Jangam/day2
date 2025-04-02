import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // URL for your backend API
  private url = 'http://localhost:3000/api/v1/userLogin';

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}