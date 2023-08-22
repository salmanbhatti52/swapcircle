import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseURL = 'https://swap.eigix.net/api'
  baseURL = 'https://portal.swapcircle.trade/api';
  fpval:any;
  constructor(public http: HttpClient) { }

  sendRequest(action: any, data?: any) {

    let header;

    header = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    header.append("Access-Control-Allow-Origin", "*");
    header.append(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT,OPTIONS"
    );
    let dataToPost = data;
    let url = `${this.baseURL}/${action}`;
    return this.http.post(url, dataToPost, {
      headers: header,
    });
  }

  getRequest(action: any, data?: any) {

    let header;

    header = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    header.append("Access-Control-Allow-Origin", "*");
    header.append(
      "Access-Control-Allow-Methods",
      "POST, GET, DELETE, PUT,OPTIONS"
    );
    let dataToPost = data;
    let url = `${this.baseURL}/${action}`;
    return this.http.get(url, {
      headers: header,
    });
  }
}
