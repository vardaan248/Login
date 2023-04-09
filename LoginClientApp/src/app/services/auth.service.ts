import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7202/api/user";
  constructor(private http: HttpClient) { }

  signup(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);
  }
}
